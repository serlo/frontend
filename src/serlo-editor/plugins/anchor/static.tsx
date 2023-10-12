import { EditorAnchorPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function AnchorStaticRenderer({ state }: EditorAnchorPlugin) {
  return <a id={state} />
}
