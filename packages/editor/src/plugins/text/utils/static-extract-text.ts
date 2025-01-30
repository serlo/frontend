import { AnyEditorDocument } from '@editor/types/editor-plugins'
import { isTextDocument } from '@editor/types/plugin-type-guards'
import type { Descendant } from 'slate'

import { MathElement } from '../types/text-editor'

function extractDescendant(node: Descendant): string {
  if (Object.hasOwn(node, 'type') && Object.hasOwn(node, 'children')) {
    return node.children.map(extractDescendant).join(' ')
  }
  return node.text ? node.text.trim() : ''
}

export function extractStringFromTextDocument(document?: AnyEditorDocument) {
  const isValid =
    document &&
    isTextDocument(document) &&
    document.state &&
    document.state.length > 0
  return isValid ? document.state.map(extractDescendant).join(' ').trim() : ''
}

export function extractDescendantTextAndLatex(node: Descendant): string {
  if (isMathElement(node)) return extractLatexFromMath(node)

  // Process recursively to ensure we don't miss any nested math elements
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map(extractDescendantTextAndLatex).join('')
  }

  if ('text' in node) return node.text || ''

  return ''
}

function extractLatexFromMath(node: MathElement): string {
  // Add spaces before and after math formulas
  return ` ${node.src} `
}

export function isMathElement(node: Descendant): node is MathElement {
  return (
    Object.hasOwn(node, 'type') &&
    Object.hasOwn(node, 'children') &&
    node.type === 'math'
  )
}
