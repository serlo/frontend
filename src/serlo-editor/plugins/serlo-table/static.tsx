import {
  SerloTableRenderer,
  TableType,
} from '@/serlo-editor/plugins/serlo-table/renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorSerloTablePlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function SerloTableStaticRenderer({ state }: EditorSerloTablePlugin) {
  const { rows, tableType } = state
  if (!rows || rows.length === 0) return null

  const rowsData = rows.map((row) => {
    return {
      cells: (row.columns?.map(({ content }) => {
        return content ? <StaticRenderer state={content} /> : null
      }) as JSX.Element[]) ?? <></>,
    }
  })

  return (
    <div className="overflow-x-auto">
      <SerloTableRenderer rows={rowsData} tableType={tableType as TableType} />
    </div>
  )
}
