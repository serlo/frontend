import {
  child,
  ChildStateType,
  EditorPlugin,
  EditorPluginProps,
  list,
  object,
  StateTypesReturnType,
  string,
} from '@edtr-io/plugin'
import {
  store,
  selectFocused,
  selectIsDocumentEmpty,
  focus,
  selectDocument,
  focusNext,
  focusPrevious,
  useAppSelector,
  useAppDispatch,
  selectFocusTree,
} from '@edtr-io/store'
import { Icon, faImages, faParagraph } from '@edtr-io/ui'
import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { KeyboardEvent } from 'react'

import { SerloTableRenderer, TableType } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

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

const tableState = object({
  rows: list(
    object({
      columns: list(
        object({
          content: child({
            plugin: 'text',
          }),
        }),
        2
      ),
    }),
    4
  ),
  tableType: string(TableType.OnlyColumnHeader),
})

export type SerloTablePluginState = typeof tableState
export type SerloTableProps = EditorPluginProps<SerloTablePluginState>

export const serloTablePlugin: EditorPlugin<SerloTablePluginState> = {
  Component: SerloTableEditor,
  config: {},
  state: tableState,
}

const newCell = { content: { plugin: 'text' } }

function SerloTableEditor(props: SerloTableProps) {
  const { rows } = props.state

  const dispatch = useAppDispatch()
  const focusedElement = useAppSelector(selectFocused)
  const { focusedRowIndex, focusedColIndex, nestedFocus } = findFocus()

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const tableStrings = loggedInData.strings.editor.serloTable

  const tableType = getTableType(props.state.tableType.value)
  const showRowHeader =
    tableType === TableType.OnlyRowHeader ||
    tableType === TableType.ColumnAndRowHeader
  const showColumnHeader =
    tableType === TableType.OnlyColumnHeader ||
    tableType === TableType.ColumnAndRowHeader

  if (!nestedFocus) return renderInactiveTable()

  return (
    <>
      {renderRenderIntoSettings()} {renderActiveTable()}
    </>
  )

  function renderInactiveTable() {
    const rowsJSX = rows.map((row) => {
      return {
        cells: row.columns.map((cell) => {
          return (
            <div className="pr-2 min-h-[2rem]" key={cell.content.id}>
              {!selectIsDocumentEmpty(store.getState(), cell.content.id) &&
                cell.content.render()}
            </div>
          )
        }),
      }
    })
    return (
      <div className="pt-3">
        <SerloTableRenderer rows={rowsJSX} tableType={tableType} />
      </div>
    )
  }

  function renderActiveTable() {
    const rowsJSX = renderActiveCellsIntoObject()

    return (
      <div className="flex pt-3">
        <div
          className="flex flex-col"
          onClick={(e) => {
            //@ts-expect-error another hack to make focus ux ok
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            e.target.querySelector('.hackdiv')?.focus()
          }}
        >
          <SerloTableRenderer isEdit rows={rowsJSX} tableType={tableType} />
          {renderAddButton(true)}
        </div>

        {renderAddButton(false)}
      </div>
    )
  }

  function updateHack() {
    const focusTree = selectFocusTree(store.getState())
    dispatch(focusNext(focusTree))
    dispatch(focusPrevious(focusTree))
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
          const dispatchFocus = () => dispatch(focus(cell.content.id))
          const isClear = selectIsDocumentEmpty(
            store.getState(),
            cell.content.id
          )

          const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
            // hack: redraw when isEmpty changes. (onKeyUp bc. keyDown is captured for some keys)
            if (e.key === 'Delete' || e.key === 'Backspace') {
              if (!isClear) updateHack()
            } else {
              if (isClear) updateHack()
            }
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
              className="hackdiv pr-2 pb-6 min-h-[3.5rem]"
            >
              {renderInlineNav(rowIndex, colIndex)}
              {cell.content.render({
                config: {
                  placeholder: '',
                  formattingOptions: isHead
                    ? headerTextFormattingOptions
                    : cellTextFormattingOptions,
                },
              })}
              {renderSwitchButton(cell, isHead, isClear)}
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
    const isFocused = cell.content.id === focusedElement
    const isImage =
      selectDocument(store.getState(), cell.content.id)?.plugin === 'image'

    if (isHead || !isFocused || !isClear) return null

    return (
      <button
        onMouseDown={(e) => e.stopPropagation()} // hack to stop edtr from stealing events
        onClick={() => {
          cell.content.replace(isImage ? 'text' : 'image')
        }}
        className="serlo-button-light m-2 py-0.5 text-sm block absolute"
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
      rowIndex === focusedRowIndex &&
      !(showColumnHeader && focusedRowIndex === 0)

    const showColButtons =
      rowIndex === 0 &&
      colIndex === focusedColIndex &&
      !(showRowHeader && focusedColIndex === 0)

    return (
      <>
        <nav className={clsx('absolute -ml-10 -mt-2 flex flex-col')}>
          {showRowButtons ? (
            <>
              {renderInlineAddButton(true)}
              {renderRemoveButton(true)}
            </>
          ) : null}
        </nav>
        <nav className={clsx('absolute -mt-12')}>
          {showColButtons ? (
            <>
              {renderInlineAddButton(false)}
              {renderRemoveButton(false)}
            </>
          ) : null}
        </nav>
      </>
    )

    function renderInlineAddButton(isRow: boolean) {
      const onInlineAdd = () => {
        if (isRow) insertRow(rowIndex)
        else insertCol(colIndex)
      }

      return (
        <button
          className={getButtonStyle()}
          title={replaceWithType(tableStrings.addTypeBefore, isRow)}
          onMouseDown={(e) => e.stopPropagation()} // hack to stop edtr from stealing events
          onClick={onInlineAdd}
        >
          <Icon icon={faCirclePlus} />
        </button>
      )
    }

    function renderRemoveButton(isRow: boolean) {
      if (isRow && rows.length === 2) return null
      if (!isRow && rows[0].columns.length === 2) return null

      if (isRow && showColumnHeader && focusedRowIndex === 0) return null
      if (!isRow && showRowHeader && focusedColIndex === 0) return null

      const confirmString = replaceWithType(tableStrings.confirmDelete, isRow)

      const onRemove = () => {
        const empty = isRow ? isEmptyRow(rowIndex) : isEmptyCol(colIndex)

        if (!empty && !window.confirm(confirmString)) return
        if (isRow) removeRow(rowIndex)
        else removeCol(colIndex)
      }

      return (
        <button
          className={getButtonStyle()}
          title={replaceWithType(tableStrings.deleteType, isRow)}
          onMouseDown={(e) => e.stopPropagation()} // hack to stop edtr from stealing events
          onClick={onRemove}
        >
          <Icon icon={faTrashCan} />
        </button>
      )
    }
  }

  function getButtonStyle() {
    return clsx('serlo-button-blue-transparent text-brand-400')
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

  function renderRenderIntoSettings() {
    return props.renderIntoSettings(
      <div>
        <label className="font-bold">
          {tableStrings.mode}:{' '}
          <select
            className="my-5"
            value={tableType}
            onChange={(e) => props.state.tableType.set(e.target.value)}
          >
            <option value={TableType.OnlyColumnHeader}>
              {tableStrings.columnHeaders}
            </option>
            <option value={TableType.OnlyRowHeader}>
              {tableStrings.rowHeaders}
            </option>
            <option value={TableType.ColumnAndRowHeader}>
              {tableStrings.columnAndRowHeaders}
            </option>
          </select>
        </label>
      </div>
    )
  }

  function findFocus() {
    let focusedRowIndex = undefined
    let focusedColIndex = undefined

    rows.some((row, rowIndex) =>
      row.columns.some((cell, colIndex) => {
        if (cell.content.id === focusedElement) {
          focusedRowIndex = rowIndex
          focusedColIndex = colIndex
          return true
        }
      })
    )
    const nestedFocus =
      props.focused ||
      (focusedRowIndex !== undefined && focusedColIndex !== undefined)

    return { focusedRowIndex, focusedColIndex, nestedFocus }
  }

  function replaceWithType(input: string, isRow: boolean) {
    return input.replace('%type%', tableStrings[isRow ? 'row' : 'column'])
  }
}

export function getTableType(text: string): TableType {
  return isTableType(text) ? text : TableType.OnlyColumnHeader
}

export function isTableType(text: string): text is TableType {
  return Object.values<string>(TableType).includes(text)
}
