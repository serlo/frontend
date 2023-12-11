import { EditorAnchorDocument } from '@/serlo-editor/types/editor-plugins'

export function AnchorStaticRenderer({ state }: EditorAnchorDocument) {
  return <a id={state} />
}
