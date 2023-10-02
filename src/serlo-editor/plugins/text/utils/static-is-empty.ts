import type { Descendant } from 'slate'

import type { CustomText, MathElement } from '../types/text-editor'
import type { AnyEditorPlugin } from '@/serlo-editor/static-renderer/static-renderer'
import type { EditorTextPlugin } from '@/serlo-editor-integration/types/editor-plugins'

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

export function isEmptyTextPlugin(plugin?: AnyEditorPlugin) {
  if (!plugin) return true
  const textState = (plugin as EditorTextPlugin).state
  if (textState.length === 0) return true
  return textState.every(isEmptyDescendant)
}
