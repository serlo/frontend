import clsx from 'clsx'
import { Fragment } from 'react'

export enum TableType {
  OnlyColumnHeader = 'OnlyColumnHeader',
  OnlyRowHeader = 'OnlyRowHeader',
  ColumnAndRowHeader = 'RowAndColumnHeader',
}

export interface SerloTableRendererProps {
  tableType: TableType
  rows: {
    cells: JSX.Element[]
  }[]
  isEdit?: boolean
}

export function SerloTableRenderer(props: SerloTableRendererProps) {
  const { tableType, rows, isEdit } = props

  const showRowHeader =
    tableType === TableType.OnlyRowHeader ||
    tableType === TableType.ColumnAndRowHeader
  const showColumnHeader =
    tableType === TableType.OnlyColumnHeader ||
    tableType === TableType.ColumnAndRowHeader

  return (
    <div className={isEdit ? undefined : 'overflow-x-auto'}>
      <table className="serlo-table mb-8">
        {showColumnHeader ? (
          <>
            <thead>{renderRows([rows[0]])}</thead>
            <tbody>{renderRows(rows.slice(1), 1)}</tbody>
          </>
        ) : (
          <tbody>{renderRows(rows)}</tbody>
        )}
      </table>
    </div>
  )

  function renderRows(rows: SerloTableRendererProps['rows'], startIndex = 0) {
    return rows.map((row, rowIndex) => {
      return (
        <tr key={startIndex + rowIndex}>
          {row.cells.map((cell, colIndex) =>
            renderCell(cell, startIndex + rowIndex, colIndex)
          )}
        </tr>
      )
    })
  }

  function renderCell(cell: JSX.Element, rowIndex: number, colIndex: number) {
    const firstRow = rowIndex === 0
    const lastRow = rowIndex === rows.length - 1
    const isColHead = showColumnHeader && firstRow
    const isRowHead = showRowHeader && colIndex === 0
    const isHead = isRowHead || isColHead
    const scope = isColHead ? 'col' : 'row'

    const borderClass = clsx(
      'first:border-l-3',
      firstRow && 'border-t-3 first:rounded-tl-xl last:rounded-tr-xl',
      lastRow && 'first:rounded-bl-xl last:rounded-br-xl'
    )

    return (
      <Fragment key={colIndex}>
        {isHead ? (
          <th
            scope={scope}
            className={clsx('serlo-th px-0 align-top', borderClass)}
          >
            {cell}
          </th>
        ) : (
          <td className={clsx('serlo-td px-0', borderClass)}>{cell}</td>
        )}
      </Fragment>
    )
  }
}
