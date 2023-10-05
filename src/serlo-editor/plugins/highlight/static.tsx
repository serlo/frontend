import { HighlightRenderer } from './renderer'
import { EditorHighlightPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function HighlightStaticRenderer({ state }: EditorHighlightPlugin) {
  if (!state.code.trim().length) return null

  return <HighlightRenderer {...state} />
}
