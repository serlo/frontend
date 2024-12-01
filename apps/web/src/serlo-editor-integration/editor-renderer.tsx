import { StickyHeader } from '@editor/prototype-microadaptivity/sticky-header'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { AnyEditorDocument } from '@editor/types/editor-plugins'

export function EditorRenderer({
  document,
}: {
  document: unknown
}): JSX.Element {
  return (
    <div className="serlo-content-with-spacing-fixes">
      <StickyHeader />
      <StaticRenderer document={document as AnyEditorDocument} />
    </div>
  )
}
