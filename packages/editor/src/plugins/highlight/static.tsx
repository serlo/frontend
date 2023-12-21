import { EditorHighlightDocument } from '@editor/types/editor-plugins'

import { HighlightRenderer } from './renderer'

export function HighlightStaticRenderer({ state }: EditorHighlightDocument) {
  if (!state.code.trim().length) return null
  return <HighlightRenderer {...state} />
}
