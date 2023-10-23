import { HighlightRenderer } from './renderer'
import { EditorHighlightDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function HighlightStaticRenderer({ state }: EditorHighlightDocument) {
  if (!state.code.trim().length) return null
  return <HighlightRenderer {...state} />
}
