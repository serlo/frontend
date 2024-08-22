import {
  SerloTableRenderer,
  TableType,
} from '@editor/plugins/serlo-table/renderer'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorSerloTableDocument } from '@editor/types/editor-plugins'

/**
 * called SerloTable for historic reasons but used in all integrations
 **/
export function SerloTableStaticRenderer({ state }: EditorSerloTableDocument) {
  const { rows, tableType } = state
  if (!rows || rows.length === 0) return null

  const rowsData = rows.map((row, rowIndex) => {
    return {
      cells: (row.columns?.map(({ content }, colIndex) => {
        return content ? (
          <div key={`${rowIndex}:${colIndex}`}>
            <StaticRenderer document={content} />
          </div>
        ) : null
      }) as JSX.Element[]) ?? <></>,
    }
  })

  return (
    <div className="overflow-x-auto">
      <SerloTableRenderer rows={rowsData} tableType={tableType as TableType} />
    </div>
  )
}
