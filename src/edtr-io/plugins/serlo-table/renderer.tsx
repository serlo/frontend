import { Fragment } from 'react'

import { TableType } from '.'

export interface SerloTableRendererProps {
  tableType: TableType
  rows: {
    cells: JSX.Element[]
  }[]
}

export function SerloTableRenderer(props: SerloTableRendererProps) {
  const { tableType, rows } = props

  const showRowHeader =
    tableType === TableType.OnlyRowHeader ||
    tableType === TableType.ColumnAndRowHeader
  const showColumnHeader =
    tableType === TableType.OnlyColumnHeader ||
    tableType === TableType.ColumnAndRowHeader

  return (
    <table className="serlo-table overflow-x-scroll mb-8">
      {rows.map((row, rowIndex) => {
        return (
          <tr key={rowIndex}>
            {row.cells.map((cell, colIndex) =>
              renderCell(cell, rowIndex, colIndex)
            )}
          </tr>
        )
      })}
    </table>
  )

  function renderCell(cell: JSX.Element, rowIndex: number, colIndex: number) {
    const isColHead = showColumnHeader && rowIndex === 0
    const isRowHead = showRowHeader && colIndex === 0
    const isHead = isRowHead || isColHead
    const scope = isColHead ? 'col' : 'row'

    return (
      <Fragment key={colIndex}>
        {isHead ? (
          <th scope={scope} className="serlo-th px-0 min-w-[4rem] min-h-[1rem]">
            {cell}
          </th>
        ) : (
          <td className="serlo-td px-0 min-h-[1rem]">{cell}</td>
        )}
      </Fragment>
    )

    // TODO: Revisit when we have examples with images.

    // Do we need to check this? Can we solve it with pure CSS?
    // const isImage =
    //   getDocument(content.get())(store.getState())?.plugin === 'image'
    //   <td style={{ width: `${100 / columnHeaders.length}%` }}
  }
}
