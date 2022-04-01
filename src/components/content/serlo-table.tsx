import { FrontendSerloTableNode } from '@/data-types'
import { TableType } from '@/edtr-io/plugins/serlo-table'
import { SerloTableRenderer } from '@/edtr-io/plugins/serlo-table/renderer'
import { RenderNestedFunction } from '@/schema/article-renderer'

export function SerloTable({
  children,
  tableType,
  renderNested,
}: FrontendSerloTableNode & {
  renderNested: RenderNestedFunction
}) {
  if (!children) return null
  const rows = children.map((row) => {
    return {
      cells: (row.children?.map((cell) => {
        return cell.children ? renderNested(cell.children, 'table-td') : null
      }) as JSX.Element[]) ?? <></>,
    }
  })
  if (!rows) return null

  return <SerloTableRenderer rows={rows} tableType={tableType as TableType} />
}
