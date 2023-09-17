import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import type { EditorRowsPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function RowsStaticRenderer({ state }: EditorRowsPlugin) {
  // <div className="flex flex-col mobile:flex-row">{children}</div>
  //className="my-block pl-[14px]"
  return (
    <>
      {state.map((row) => (
        <div key={row.id} className="my-block pl-[14px]">
          <StaticRenderer state={row} />
        </div>
      ))}
    </>
  )
}
