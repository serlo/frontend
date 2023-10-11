import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import type { EditorRowsPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function RowsStaticRenderer({ state }: EditorRowsPlugin) {
  return (
    <>
      {state.map((row, index) => {
        // we can usually use the id, but for older content we fall back to index and hope that's enough
        const key = row.id ?? `${row.plugin}${index}`

        return (
          <div key={key} id={row.id?.split('-')[0]} className="my-block">
            <StaticRenderer document={row} />
          </div>
        )
      })}
    </>
  )
}
