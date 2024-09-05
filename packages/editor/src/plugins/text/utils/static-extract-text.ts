import {
  type AnyEditorDocument,
  type SupportedEditorDocument,
} from '@editor/types/editor-plugins'
import { isTextDocument } from '@editor/types/plugin-type-guards'
import type { Descendant } from 'slate'

import { MathElement } from '../types/text-editor'

export function extractDescendant(node: Descendant): string {
  if (Object.hasOwn(node, 'type') && Object.hasOwn(node, 'children')) {
    return node.children.map(extractDescendant).join(' ')
  }
  return node.text ? node.text.trim() : ''
}

export function isMathElement(node: Descendant): node is MathElement {
  return (
    Object.hasOwn(node, 'type') &&
    Object.hasOwn(node, 'children') &&
    node.type === 'math'
  )
}

export function extractStringFromTextDocument(document?: AnyEditorDocument) {
  if (
    document &&
    isTextDocument(document) &&
    document.state &&
    document.state.length > 0
  ) {
    return document.state.map(extractDescendant).join(' ').trim()
  }
  return ''
}

function extractLatexFromMath(node: MathElement): string {
  // Add spaces before and after math formulas
  return ` ${node.src} `
}

function extractDescendantTextAndLatex(node: Descendant): string {
  if (isMathElement(node)) {
    return extractLatexFromMath(node)
  }

  // Process recursively to ensure we don't miss any nested math elements
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map(extractDescendantTextAndLatex).join('')
  }

  if ('text' in node) {
    return node.text || ''
  }

  return ''
}

export function extractTextAndLatexFromAnyDocument(
  anyDocument?: AnyEditorDocument
): string {
  if (!anyDocument) return ''

  const document = anyDocument as SupportedEditorDocument

  if (document.plugin === 'text' && Array.isArray(document.state)) {
    return document.state.map(extractDescendantTextAndLatex).join('')
  }

  if (Array.isArray(document.state)) {
    return document.state
      .map((subDocument) =>
        extractTextAndLatexFromAnyDocument(subDocument as AnyEditorDocument)
      )
      .join('')
  }

  if (typeof document.state === 'object' && document.state !== null) {
    return Object.values(document.state)
      .map((subDocument) =>
        extractTextAndLatexFromAnyDocument(subDocument as AnyEditorDocument)
      )
      .join('')
  }

  return ''
}
