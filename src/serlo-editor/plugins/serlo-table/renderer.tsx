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
    <div className={isEdit ? undefined : 'overflow-x-scroll'}>
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
    const isColHead = showColumnHeader && rowIndex === 0
    const isRowHead = showRowHeader && colIndex === 0
    const isHead = isRowHead || isColHead
    const scope = isColHead ? 'col' : 'row'

    return (
      <Fragment key={colIndex}>
        {isHead ? (
          <th scope={scope} className="serlo-th px-0 align-top">
            {cell}
          </th>
        ) : (
          <td className="serlo-td px-0">{cell}</td>
        )}
      </Fragment>
    )
  }
}
