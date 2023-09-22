import { HighlightRenderer } from './renderer'
import { EditorHighlightPlugin } from '@/serlo-editor-integration/types/editor-plugins'

// if (Object.keys(node.state).length === 0) return []

export function HighlightStaticRenderer({ state }: EditorHighlightPlugin) {
  // TODO: \n does not get displayed
  return <HighlightRenderer {...state} />
}
