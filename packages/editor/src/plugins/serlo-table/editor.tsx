import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import {
  store,
  selectFocused,
  selectIsDocumentEmpty,
  focus,
  useAppSelector,
  useAppDispatch,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { cn } from '@editor/utils/cn'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { KeyboardEvent, useState } from 'react'

import type { SerloTableProps } from '.'
import { CellSwitchButton } from './cell-switch-button'
import { SerloTableRenderer, TableType } from './renderer'
import { SerloTableToolbar } from './toolbar'
import { getTableType } from './utils/get-table-type'
import { TextEditorConfig } from '../text'
import { instanceStateStore } from '../text/utils/instance-state-store'

const newCell = { content: { plugin: EditorPluginType.Text } }

export function SerloTableEditor(props: SerloTableProps) {
  const { rows } = props.state

  const [, setUpdateHack] = useState(0)

  const dispatch = useAppDispatch()
  const focusedElement = useAppSelector(selectFocused)
  const { focusedRowIndex, focusedColIndex, nestedFocus } = findFocus()

  const tableStrings = useEditorStrings().plugins.serloTable

  const tableType = getTableType(props.state.tableType.value)
  const showRowHeader =
    tableType === TableType.OnlyRowHeader ||
    tableType === TableType.ColumnAndRowHeader
  const showColumnHeader =
    tableType === TableType.OnlyColumnHeader ||
    tableType === TableType.ColumnAndRowHeader

  const rowsJSX = renderActiveCellsIntoObject()

  return (
    <>
      {props.focused || nestedFocus ? <SerloTableToolbar {...props} /> : null}

      <div className="relative pt-[19px]">
        <div className="flex">
          <div className="flex flex-col">
            <SerloTableRenderer rows={rowsJSX} tableType={tableType} />
            {nestedFocus ? renderAddRowButton() : null}
          </div>

          {nestedFocus ? renderAddColButton() : null}
        </div>
      </div>
    </>
  )

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
          const isClear = selectIsDocumentEmpty(
            store.getState(),
            cell.content.id
          )

          const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
            // hack: redraw when isEmpty changes. (onKeyUp bc. keyDown is captured for some keys)
            if (e.key === 'Delete' || e.key === 'Backspace') {
              if (!isClear) setUpdateHack((count) => count + 1)
            } else {
              if (isClear) setUpdateHack((count) => count + 1)
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
              onKeyUp={onKeyUpHandler} // keyUp because some onKeyDown keys are not bubbling
              onKeyDown={onKeyDownHandler}
              className={cn(
                '[&>div>[data-slate-editor]]:pr-2',
                '[&>div>[data-slate-editor]]:pb-block',
                '[&>div>[data-slate-editor]]:focus:caret-visible'
              )}
            >
              {renderInlineNav(rowIndex, colIndex)}
              {cell.content.render({
                config: {
                  isInlineChildEditor: true,
                  placeholder: '',
                  formattingOptions: isHead
                    ? props.config.headerTextFormattingOptions
                    : props.config.cellTextFormattingOptions,
                } as TextEditorConfig,
              })}
              {editorPlugins.getByType(EditorPluginType.Image) ? (
                <CellSwitchButton
                  cell={cell}
                  isHead={isHead}
                  isClear={isClear}
                />
              ) : null}
            </div>
          )
        }),
      }
    })
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
        <nav className="absolute -ml-7 -mt-2 flex flex-col">
          {showRowButtons ? (
            <>
              {renderInlineAddButton(true)}
              {renderRemoveButton(true)}
            </>
          ) : null}
        </nav>
        <nav className="absolute -top-2 z-20">
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
          className={cn(
            'serlo-tooltip-trigger text-gray-300 transition-colors hover:text-editor-primary focus:text-editor-primary',
            isRow ? '' : 'mr-2'
          )}
          onMouseDown={(e) => e.stopPropagation()} // hack to stop edtr from stealing events
          onClick={onInlineAdd}
        >
          <EditorTooltip
            text={replaceWithType(tableStrings.addTypeBefore, isRow)}
            className="top-6"
          />
          <FaIcon icon={faCirclePlus} />
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

        if (!empty && !window.confirm(confirmString)) {
          // Regain focus after canceling popup
          // We need this (slight) hack because the editor is not tracking the focus if
          // an alert happens, to the text-plugin will not refocus itself
          // More a proof of concept that such a patch is possible, but not a good
          // general solution ...
          const cellPluginState =
            instanceStateStore[
              rows[focusedRowIndex ?? 0].columns[focusedColIndex ?? 0].content
                .id
            ]
          if (cellPluginState) cellPluginState.needRefocus++
          setUpdateHack((count) => count + 1)
          return
        }
        if (isRow) removeRow(rowIndex)
        else removeCol(colIndex)

        // dispatch focus
        const rowToFocusAfter = isRow
          ? rowIndex + 1 < rows.length
            ? rowIndex + 1
            : rowIndex - 1
          : focusedRowIndex ?? 0

        const colToFocusAfter = isRow
          ? focusedColIndex ?? 0
          : colIndex + 1 < rows[0].columns.length
            ? colIndex + 1
            : colIndex - 1

        dispatch(
          focus(rows[rowToFocusAfter].columns[colToFocusAfter].content.id)
        )
      }

      return (
        <button
          className="serlo-tooltip-trigger text-gray-300 transition-colors hover:text-editor-primary focus:text-editor-primary"
          onMouseDown={(e) => e.stopPropagation()} // hack to stop edtr from stealing events
          onClick={onRemove}
        >
          <EditorTooltip
            text={replaceWithType(tableStrings.deleteType, isRow)}
            className="top-6"
          />
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

  function renderAddRowButton() {
    return (
      <div className="relative">
        <button
          className={cn(
            'serlo-button-editor-secondary serlo-tooltip-trigger',
            'absolute -bottom-1.5 z-20 mx-side w-[calc(100%-1.9rem)]'
          )}
          onClick={() => insertRow()}
        >
          <EditorTooltip
            text={replaceWithType(tableStrings.addType, true)}
            className="-left-0.5 -top-9"
          />
          +
        </button>
      </div>
    )
  }

  function renderAddColButton() {
    return (
      <button
        className={cn(
          'serlo-button-editor-secondary serlo-tooltip-trigger -ml-1 mb-8 px-2.5'
        )}
        onClick={() => insertCol()}
      >
        <EditorTooltip
          text={replaceWithType(tableStrings.addType, false)}
          className="left-8 top-0"
        />
        +
      </button>
    )
  }

  function findFocus() {
    let focusedRowIndex: number | undefined = undefined
    let focusedColIndex: number | undefined = undefined

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
