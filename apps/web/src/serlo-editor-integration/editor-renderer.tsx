import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { AnyEditorDocument } from '@editor/types/editor-plugins'

export function EditorRenderer({
  document,
}: {
  document: unknown
}): JSX.Element {
  return (
    <div className="serlo-content-with-spacing-fixes">
      <StaticRenderer document={document as AnyEditorDocument} />
    </div>
  )
}
