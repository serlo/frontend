import { extractDescendantTextAndLatex } from '@editor/plugins/text/utils/static-extract-text'
import {
  AnyEditorDocument,
  SupportedEditorDocument,
} from '@editor/types/editor-plugins'

export function extractTextAndLatex(anyDocument?: AnyEditorDocument): string {
  if (!anyDocument) return ''

  const document = anyDocument as SupportedEditorDocument

  if (document.plugin === 'text' && Array.isArray(document.state)) {
    return document.state.map(extractDescendantTextAndLatex).join('')
    return ''
  }

  if (Array.isArray(document.state)) {
    return document.state
      .map((subDocument) =>
        extractTextAndLatex(subDocument as AnyEditorDocument)
      )
      .join('')
  }

  if (typeof document.state === 'object' && document.state !== null) {
    return Object.values(document.state)
      .map((subDocument) =>
        extractTextAndLatex(subDocument as AnyEditorDocument)
      )
      .join('')
  }

  return ''
}
