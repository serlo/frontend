import {
  AnyEditorDocument,
  SupportedEditorDocument,
} from '@editor/types/editor-plugins'
import { isTextDocument } from '@editor/types/plugin-type-guards'
import type { Descendant } from 'slate'

export function extractDescendant(node: Descendant): string {
  if (Object.hasOwn(node, 'type') && Object.hasOwn(node, 'children')) {
    return node.children.map(extractDescendant).join(' ')
  }
  return node.text ? node.text.trim() : ''
}

export function extractStringFromTextDocument(document?: AnyEditorDocument) {
  if (document && isTextDocument(document) && document.state.length > 0) {
    return document.state.map(extractDescendant).join(' ').trim()
  }
  return ''
}

export function extractStringFromAnyDocument(
  anyDocument?: AnyEditorDocument
): string {
  if (!anyDocument) return ''

  const document = anyDocument as SupportedEditorDocument

  if (isTextDocument(document)) {
    return extractStringFromTextDocument(document)
  }

  if (Array.isArray(document?.state)) {
    return document.state
      .map((subDocument) =>
        extractStringFromAnyDocument(subDocument as AnyEditorDocument)
      )
      .join(' ')
  }

  if (typeof document?.state === 'object' && document.state !== null) {
    return Object.values(document.state)
      .map((subDocument) =>
        extractStringFromAnyDocument(subDocument as AnyEditorDocument)
      )
      .join(' ')
  }

  return extractStringFromTextDocument(document)
}
