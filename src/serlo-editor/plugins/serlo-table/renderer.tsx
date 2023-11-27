import { Fragment } from 'react'

import { cn } from '@/helper/cn'

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
}

export function SerloTableRenderer({
  tableType,
  rows,
}: SerloTableRendererProps) {
  const showRowHeader =
    tableType === TableType.OnlyRowHeader ||
    tableType === TableType.ColumnAndRowHeader
  const showColumnHeader =
    tableType === TableType.OnlyColumnHeader ||
    tableType === TableType.ColumnAndRowHeader

  return (
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

    const borderClass = cn(
      'first:border-l-3',
      firstRow && 'border-t-3 first:rounded-tl-xl last:rounded-tr-xl',
      lastRow && 'first:rounded-bl-xl last:rounded-br-xl'
    )

    return (
      <Fragment key={colIndex}>
        {isHead ? (
          <th
            scope={scope}
            className={cn('serlo-th px-0 align-top', borderClass)}
          >
            {cell}
          </th>
        ) : (
          <td className={cn('serlo-td px-0', borderClass)}>{cell}</td>
        )}
      </Fragment>
    )
  }
}
