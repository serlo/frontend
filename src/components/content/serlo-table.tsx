import { FrontendSerloTableNode } from '@/data-types'
import { getTableType, TableType } from '@/edtr-io/plugins/serlo-table'
import { RenderNestedFunction } from '@/schema/article-renderer'

export function SerloTable({
  rowHeaders,
  columnHeaders,
  rows,
  tableType,
  renderNested,
}: FrontendSerloTableNode['state'] & {
  renderNested: RenderNestedFunction
}) {
  const _tableType = getTableType(tableType)
  const showRowHeader =
    _tableType === TableType.OnlyRowHeader ||
    _tableType === TableType.ColumnAndRowHeader
  const showColumnHeader =
    _tableType === TableType.OnlyColumnHeader ||
    _tableType === TableType.ColumnAndRowHeader

  console.log('table plugin')
  console.log(rowHeaders)
  // SyntaxHighlighter has own styles on pre, so wrap in div to use own classes
  return (
    <div className="mb-block max-w-[100vw] overflow-auto">
      <table>
        {showColumnHeader && (
          <thead>
            <tr>
              {showRowHeader && <th />}
              {columnHeaders.map(({ content }, column) => (
                <th key={column}>{renderNested(content, 'header-content')}</th>
                <></>
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
                  <th>
                    {/* {isEmpty(rowHeader.id)(store.getState())
                      ? '<Empty>'
                      : rowHeader.render()} */}
                  </th>
                )}
                {columns.map(({ content }, columnIndex) => {
                  const isImage =
                    // getDocument(content.get())(store.getState())?.plugin ===
                    'image'

                  return isImage ? (
                    <td
                      key={columnIndex}
                      style={{ width: `${100 / columnHeaders.length}%` }}
                    >
                      {/* {!isEmpty(content.id)(store.getState()) &&
                        content.render()} */}
                    </td>
                  ) : (
                    <td key={columnIndex}>
                      {/* {!isEmpty(content.id)(store.getState()) &&
                        content.render()} */}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
