import { useScopedStore } from '@edtr-io/core'
import { getDocument, isEmpty } from '@edtr-io/store'
import styled from 'styled-components'
import { getTableType, SerloTableProps, TableType } from '.'

export function SerloTableRenderer(props: SerloTableProps) {
  const store = useScopedStore()
  const { rowHeaders, columnHeaders, rows } = props.state
  const tableType = getTableType(props.state.tableType.value)
  const showRowHeader =
    tableType === TableType.OnlyRowHeader ||
    tableType === TableType.ColumnAndRowHeader
  const showColumnHeader =
    tableType === TableType.OnlyColumnHeader ||
    tableType === TableType.ColumnAndRowHeader

  return (
    <Table>
      {showColumnHeader && (
        <thead>
          <tr>
            {showRowHeader && <TableHeader />}
            {columnHeaders.map(({ content }, column) => (
              <TableHeader key={column}>
                {isEmpty(content.id)(store.getState())
                  ? '<Empty>'
                  : content.render()}
              </TableHeader>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map(({ columns }, rowIndex) => {
          const rowHeader = rowHeaders[rowIndex].content
          return (
            <tr key={rowIndex}>
              {showRowHeader && (
                <TableHeader>
                  {isEmpty(rowHeader.id)(store.getState())
                    ? '<Empty>'
                    : rowHeader.render()}
                </TableHeader>
              )}
              {columns.map(({ content }, columnIndex) => {
                const isImage =
                  getDocument(content.get())(store.getState())?.plugin ===
                  'image'

                return isImage ? (
                  <TableCell
                    key={columnIndex}
                    style={{ width: `${100 / columnHeaders.length}%` }}
                  >
                    {!isEmpty(content.id)(store.getState()) && content.render()}
                  </TableCell>
                ) : (
                  <TableCell key={columnIndex}>
                    {!isEmpty(content.id)(store.getState()) && content.render()}
                  </TableCell>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export const Table = styled.table({
  borderCollapse: 'collapse',
  width: '100%',
  height: '100%',
  overflowX: 'scroll',
  // hack, can be removed it text plugin can be set to inline
  div: {
    marginBottom: '0px',
  },
})

export const TableHeader = styled.th({
  border: '1px solid black',
  backgroundColor: '#ddd',
  minWidth: '4rem',
})

export const TableCell = styled.td({
  border: '1px solid black',
  height: '1em',
})
