import {
  faCirclePlus,
  faImages,
  faParagraph,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { KeyboardEvent, useState } from 'react'

import { SerloTableProps } from '.'
import { useAreImagesDisabledInTable } from './contexts/are-images-disabled-in-table-context'
import { SerloTableRenderer, TableType } from './renderer'
import { SerloTableToolbar } from './toolbar'
import { TextEditorConfig } from '../text'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { ChildStateType, StateTypesReturnType } from '@/serlo-editor/plugin'
import {
  store,
  selectIsDocumentEmpty,
  focus,
  selectDocument,
  useAppDispatch,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const headerTextFormattingOptions = ['code', 'katex', 'links', 'math']
const cellTextFormattingOptions = [
  'code',
  'colors',
  'katex',
  'links',
  'lists',
  'math',
  'richText',
]


// TODO: moving cells with tab does not immediately activate slate again (no cursor sometimes)

const newCell = { content: { plugin: EditorPluginType.Text } }

export function SerloTableEditor(props: SerloTableProps) {
  const { config, domFocusWithin, state } = props
  const { rows } = state
  const dispatch = useAppDispatch()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_update, setUpdate] = useState(0)

  const [focusedIndexes, setFocusedIndexes] = useState<{
    row?: number
    col?: number
  }>({ row: undefined, col: undefined })

  function updateFocus() {
    setFocusedIndexes(() => {
      return {
        row: document.activeElement?.closest('tr')?.rowIndex,
        col: document.activeElement?.closest('td')?.cellIndex,
      }
    })
  }

  const areImagesDisabled = useAreImagesDisabledInTable()

  const tableStrings = useEditorStrings().plugins.serloTable

  const tableType = getTableType(state.tableType.value)
  const showRowHeader =
    tableType === TableType.OnlyRowHeader ||
    tableType === TableType.ColumnAndRowHeader
  const showColumnHeader =
    tableType === TableType.OnlyColumnHeader ||
    tableType === TableType.ColumnAndRowHeader

  return domFocusWithin ? renderActiveTable() : renderInactiveTable()

  function renderInactiveTable() {
    const rowsJSX = rows.map((row) => {
      return {
        cells: row.columns.map((cell) => (
          <div className="min-h-[2rem] pr-2" key={cell.content.id}>
            {!selectIsDocumentEmpty(store.getState(), cell.content.id) &&
              cell.content.render()}
          </div>
        )),
      }
    })
    return <SerloTableRenderer rows={rowsJSX} tableType={tableType} />
  }

  function renderActiveTable() {
    const rowsJSX = renderActiveCellsIntoObject()
    return (
      <>
        {domFocusWithin ? <SerloTableToolbar {...props} /> : null}
        <div className="flex">
          <div
            className="flex flex-col"
            onClick={(e) => {
              // another hack to make focus ux at least ok
              const target = e.target as HTMLDivElement
              const hackDiv = target.querySelector('.hackdiv') as HTMLDivElement
              hackDiv?.focus()
            }}
          >
            <SerloTableRenderer isEdit rows={rowsJSX} tableType={tableType} />
            {renderAddButton(true)}
          </div>

          {renderAddButton(false)}
        </div>
      </>
    )
  }

  function renderActiveCellsIntoObject() {
    return rows.map((row, rowIndex) => {
      return {
        cells: row.columns.map((cell, colIndex) => {
          const isColHead = showColumnHeader && rowIndex === 0
          const isRowHead = showRowHeader && colIndex === 0
          const isHead = isRowHead || isColHead
          const isLast =
            rowIndex === rows.length - 1 &&
            colIndex === rows[0].columns.length - 1
          const dispatchFocus = () => {
            dispatch(focus(cell.content.id))
            updateFocus()
          }
          const isClear = selectIsDocumentEmpty(
            store.getState(),
            cell.content.id
          )

          const onKeyUpHandler = () => {
            // hack: redraw when isEmpty changes. (onKeyUp bc. keyDown is captured for some keys)
            setUpdate((val) => val + 1)
          }
          const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
            if (
              e.key === 'Tab' &&
              (e.target as HTMLElement).tagName === 'BUTTON' &&
              isLast
            ) {
              insertRow()
            }
          }

          return (
            <div
              key={colIndex}
              tabIndex={0} // capture tab
              onFocus={dispatchFocus} // hack: focus slate directly on tab
              onKeyUp={onKeyUpHandler} // keyUp because some onKeyDown keys are not bubbling
              onKeyDown={onKeyDownHandler}
              className="hackdiv group/cell min-h-[3.5rem] pb-6 pr-2"
            >
              {renderInlineNav(rowIndex, colIndex)}
              {cell.content.render({
                config: {
                  isInlineChildEditor: true,
                  placeholder: '',
                  formattingOptions: isHead
                    ? headerTextFormattingOptions
                    : cellTextFormattingOptions,
                } as TextEditorConfig,
              })}
              {config.allowImageInTableCells && !areImagesDisabled
                ? renderSwitchButton(cell, isHead, isClear)
                : null}
              {/* hack: make sure we capture most clicks in cells */}
              <style jsx global>{`
                .serlo-td,
                .serlo-th {
                  height: 1rem;
                  min-width: 4rem;
                }
                .hackdiv > div > div > div {
                  margin-bottom: 0;
                }
              `}</style>
            </div>
          )
        }),
      }
    })
  }

  function renderSwitchButton(
    cell: StateTypesReturnType<{
      content: ChildStateType<string, unknown>
    }>,
    isHead: boolean,
    isClear: boolean
  ) {
    if (isHead || !isClear) return null

    const isImage =
      selectDocument(store.getState(), cell.content.id)?.plugin ===
      EditorPluginType.Image

    return (
      <button
        onMouseDown={(e) => e.stopPropagation()} // hack to stop editor from stealing events
        onClick={() => {
          cell.content.replace(
            isImage ? EditorPluginType.Text : EditorPluginType.Image
          )
        }}
        className="serlo-button-light absolute m-2 block hidden py-0.5 text-sm group-focus-within/cell:block"
        title={
          isImage ? tableStrings.convertToText : tableStrings.convertToImage
        }
      >
        <FaIcon icon={isImage ? faParagraph : faImages} />
      </button>
    )
  }

  function renderInlineNav(rowIndex: number, colIndex: number) {
    const showRowButtons =
      colIndex === 0 &&
      rowIndex === focusedIndexes.row &&
      !(showColumnHeader && focusedIndexes.row === 0)

    const showColButtons =
      rowIndex === 0 &&
      colIndex === focusedIndexes.col &&
      !(showRowHeader && focusedIndexes.col === 0)

    return (
      <>
        {showRowButtons ? (
          <nav className="absolute -ml-10 -mt-2 flex flex-col">
            {renderInlineAddButton(true)}
            {renderRemoveButton(true)}
          </nav>
        ) : null}
        {showColButtons ? (
          <nav className="absolute -mt-12">
            {renderInlineAddButton(false)}
            {renderRemoveButton(false)}
          </nav>
        ) : null}
      </>
    )

    function renderInlineAddButton(isRow: boolean) {
      const onInlineAdd = () => {
        if (isRow) insertRow(rowIndex)
        else insertCol(colIndex)
      }

      return (
        <button
          className="serlo-button-blue-transparent text-brand-400"
          title={replaceWithType(tableStrings.addTypeBefore, isRow)}
          onMouseDown={(e) => e.stopPropagation()} // hack to stop edtr from stealing events
          onClick={onInlineAdd}
        >
          <FaIcon icon={faCirclePlus} />
        </button>
      )
    }

    function renderRemoveButton(isRow: boolean) {
      if (isRow && rows.length === 2) return null
      if (!isRow && rows[0].columns.length === 2) return null

      if (isRow && showColumnHeader && focusedIndexes.row === 0) return null
      if (!isRow && showRowHeader && focusedIndexes.col === 0) return null

      const confirmString = replaceWithType(tableStrings.confirmDelete, isRow)

      const onRemove = () => {
        const empty = isRow ? isEmptyRow(rowIndex) : isEmptyCol(colIndex)

        if (!empty && !window.confirm(confirmString)) return
        if (isRow) removeRow(rowIndex)
        else removeCol(colIndex)
      }

      return (
        <button
          className="serlo-button-blue-transparent text-brand-400"
          title={replaceWithType(tableStrings.deleteType, isRow)}
          onMouseDown={(e) => e.stopPropagation()} // hack to stop edtr from stealing events
          onClick={onRemove}
        >
          <FaIcon icon={faTrashCan} />
        </button>
      )
    }
  }

  function insertRow(beforeIndex?: number) {
    const pos = beforeIndex ?? rows.length
    rows.insert(pos, {
      columns: rows[0].columns.map(() => newCell),
    })
  }

  function insertCol(beforeIndex?: number) {
    for (const row of rows) {
      const pos = beforeIndex ?? row.columns.length
      row.columns.insert(pos, newCell)
    }
  }

  function isEmptyRow(rowIndex: number) {
    return rows[rowIndex].columns.every((cell) =>
      selectIsDocumentEmpty(store.getState(), cell.content.id)
    )
  }

  function isEmptyCol(colIndex: number) {
    return rows.every((row) => {
      const cell = row.columns[colIndex]
      return selectIsDocumentEmpty(store.getState(), cell.content.id)
    })
  }

  function removeCol(colIndex: number) {
    for (const row of rows) {
      row.columns.remove(colIndex)
    }
  }

  function removeRow(rowIndex: number) {
    rows.remove(rowIndex)
  }

  function renderAddButton(isRow: boolean) {
    return (
      <button
        className={clsx(
          'serlo-button-light',
          isRow ? 'm-4 -mt-4 w-auto' : 'mb-16'
        )}
        title={replaceWithType(tableStrings.addType, isRow)}
        onClick={() => {
          if (isRow) insertRow()
          else insertCol()
        }}
      >
        +
      </button>
    )
  }

  function replaceWithType(input: string, isRow: boolean) {
    return input.replace('%type%', tableStrings[isRow ? 'row' : 'column'])
  }
}

export function getTableType(text: string): TableType {
  return isTableType(text) ? text : TableType.OnlyColumnHeader
}

function isTableType(text: string): text is TableType {
  return Object.values<string>(TableType).includes(text)
}
