import { useScopedSelector, useScopedStore } from '@edtr-io/core'
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
  getFocused,
  isEmpty,
  focus,
  getDocument,
  focusNext,
  focusPrevious,
} from '@edtr-io/store'
import { Icon, faTimes, faImages, faParagraph } from '@edtr-io/ui'
import clsx from 'clsx'
import { KeyboardEvent, useEffect } from 'react'

import { SerloTableRenderer, TableType } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const headerTextPlugins = {
  code: true,
  colors: false,
  headings: false,
  katex: true,
  links: false,
  lists: false,
  math: true,
  paragraphs: false,
  richText: false,
  suggestions: false,
}

const cellTextPlugins = {
  code: true,
  colors: true,
  headings: false,
  katex: true,
  links: true,
  lists: true,
  math: true,
  paragraphs: false,
  richText: true,
  suggestions: false,
}

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
  const store = useScopedStore()

  const focusedElement = useScopedSelector(getFocused())
  const { focusedRowIndex, focusedColIndex, nestedFocus } = findFocus()

  useEffect(() => {
    if (!nestedFocus) trimEmptyRows()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nestedFocus])

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
            <div className="pr-2" key={cell.content.id}>
              {!isEmpty(cell.content.id)(store.getState()) &&
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
        <div className="flex flex-col">
          <SerloTableRenderer rows={rowsJSX} tableType={tableType} />
          {renderAddButton(true)}
        </div>

        {renderAddButton(false)}
      </div>
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
          const dispatchFocus = () => store.dispatch(focus(cell.content.id))
          const isClear = isEmpty(cell.content.id)(store.getState())
          const updateHack = () => {
            store.dispatch(focusNext())
            store.dispatch(focusPrevious())
          }
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
              onMouseUp={updateHack} // hack: focus slate directly on click
              onFocus={dispatchFocus} // hack: focus slate directly on tab
              onKeyUp={onKeyUpHandler} // keyUp because some onKeyDown keys are not bubbling
              onKeyDown={onKeyDownHandler}
              className="hackdiv pr-2"
            >
              {renderRemoveButtons(rowIndex, colIndex)}
              {cell.content.render({
                config: {
                  placeholder: '',
                  plugins: isHead ? headerTextPlugins : cellTextPlugins,
                },
              })}
              {renderSwitchButton(cell, isHead, isClear)}
              {/* hack: make sure we capture most clicks in cells */}
              <style jsx global>{`
                .hackdiv {
                  padding-bottom: 25px;
                  > div > div > div {
                    margin-bottom: 0;
                  }
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
      getDocument(cell.content.id)(store.getState())?.plugin === 'image'

    if (isHead || !isFocused || !isClear) return null

    return (
      <button
        onMouseDown={(e) => e.stopPropagation()} // hack to stop edtr from stealing events
        onClick={() => {
          cell.content.replace(isImage ? 'text' : 'image')
        }}
        className="serlo-button serlo-make-interactive-light m-2 py-0.5 text-sm ml-auto block absolute"
        title={
          isImage ? tableStrings.convertToText : tableStrings.convertToImage
        }
      >
        <FaIcon icon={isImage ? faParagraph : faImages} />
      </button>
    )
  }

  function renderRemoveButtons(rowIndex: number, colIndex: number) {
    return (
      <>
        {colIndex === 0
          ? renderRemoveButton(true, rowIndex === focusedRowIndex)
          : null}
        {rowIndex === 0
          ? renderRemoveButton(false, colIndex === focusedColIndex)
          : null}
      </>
    )

    function renderRemoveButton(isRow: boolean, show: boolean) {
      if (isRow && rows.length === 1) return
      if (!isRow && rows[0].columns.length === 1) return
      const confirmString = replaceWithType(tableStrings.confirmDelete, isRow)

      const onClickHandler = () => {
        const empty = isRow ? isEmptyRow(rowIndex) : isEmptyCol(colIndex)

        if (!empty && !window.confirm(confirmString)) return
        if (isRow) removeRow(rowIndex)
        else removeCol(colIndex)
      }

      return (
        <button
          className={clsx(
            'serlo-button serlo-make-interactive-transparent-blue absolute',
            isRow ? '-ml-10 -mt-2' : '-mt-12',
            show ? '' : 'opacity-0 pointer-events-none'
          )}
          title={replaceWithType(tableStrings.deleteType, isRow)}
          onMouseDown={(e) => e.stopPropagation()} // hack to stop edtr from stealing events
          onClick={onClickHandler}
        >
          <Icon icon={faTimes} />
        </button>
      )
    }
  }

  function insertRow() {
    rows.insert(rows.length, {
      columns: rows[0].columns.map(() => newCell),
    })
  }

  function insertCol() {
    for (const row of rows) {
      row.columns.insert(row.columns.length, newCell)
    }
  }

  function isEmptyRow(rowIndex: number) {
    return rows[rowIndex].columns.every((cell) =>
      isEmpty(cell.content.id)(store.getState())
    )
  }

  function isEmptyCol(colIndex: number) {
    return rows.every((row) => {
      const cell = row.columns[colIndex]
      return isEmpty(cell.content.id)(store.getState())
    })
  }

  function trimEmptyRows() {
    rows.set((rows) => {
      const withoutEmptyRows = rows.filter(
        (_row, rowIndex) => !isEmptyRow(rowIndex) || rowIndex < 2
      )
      return withoutEmptyRows
      // const emptyColIndexes = rows[0].columns.reduce(
      //   (result, _col, colIndex) =>
      //     isEmptyCol(colIndex) ? [...result, colIndex] : result,
      //   [] as number[]
      // )
      // return withoutEmptyRows.map((row) => {
      //   return {
      //     columns: row.columns.filter(
      //       (_col, colIndex) =>
      //         !emptyColIndexes.includes(colIndex) || colIndex === 0
      //     ),
      //   }
      // })
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
          'serlo-button serlo-make-interactive-light',
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
