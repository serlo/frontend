import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import { isTextDocument } from '@editor/types/plugin-type-guards'
import type { Descendant } from 'slate'

import type { CustomText, MathElement } from '../types/text-editor'

export function isEmptyCustomText(customText: CustomText) {
  if (!customText || !customText.text) return true
  return customText.text.trim().length === 0
}

export function isEmptyMath(math: MathElement) {
  return Object.hasOwn(math, 'src') && math.src.trim().length === 0
}

export function isEmptyDescendant(node: Descendant): boolean {
  if (Object.hasOwn(node, 'type')) {
    if (node.type === 'p') return node.children.every(isEmptyDescendant)
    if (node.type === 'a') return node.children.every(isEmptyCustomText)
    if (node.type === 'h') return node.children.every(isEmptyCustomText)
    if (node.type === 'math') return isEmptyMath(node)
    return false
  }
  return isEmptyCustomText(node)
}

export function isEmptyTextDocument(document?: AnyEditorDocument) {
  if (!document) return true
  if (!isTextDocument(document)) return false

  const textState = document.state
  if (!textState || !textState.length) return true
  return textState.every(isEmptyDescendant)
}
