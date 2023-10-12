import { EditorAnchorDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function AnchorStaticRenderer({ state }: EditorAnchorDocument) {
  return <a id={state} />
}
