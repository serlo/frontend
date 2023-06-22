import type { FrontendSerloTableNode } from '@/frontend-node-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'
import {
  SerloTableRenderer,
  TableType,
} from '@/serlo-editor/plugins/serlo-table/renderer'

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
