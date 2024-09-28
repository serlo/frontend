import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { AnyEditorDocument } from '@editor/types/editor-plugins'

export function EditorRenderer({
  document,
}: {
  document: unknown
}): JSX.Element {
  return <StaticRenderer document={document as AnyEditorDocument} />
}
