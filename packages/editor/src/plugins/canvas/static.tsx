import { CanvasRenderer } from '@editor/plugins/canvas/renderer'
import { EditorCanvasDocument } from '@editor/types/editor-plugins'

export function CanvasStaticRenderer({
  state: { document },
}: EditorCanvasDocument) {
  if (!document) return null

  return <CanvasRenderer document={document} />
}
