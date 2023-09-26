import type { Descendant } from 'slate'

import type { CustomText, MathElement } from '../types/text-editor'
import type { AnyEditorPlugin } from '@/serlo-editor/static-renderer/static-renderer'
import type { EditorTextPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function isCustomTextEmpty(customText: CustomText) {
  return customText.text.trim().length === 0
}

export function isMathEmpty(math: MathElement) {
  return Object.hasOwn(math, 'src') && math.src.trim().length === 0
}

export function isDescendantEmpty(node: Descendant): boolean {
  if (Object.hasOwn(node, 'type')) {
    if (node.type === 'p') return node.children.every(isDescendantEmpty)
    if (node.type === 'a') return node.children.every(isCustomTextEmpty)
    if (node.type === 'h') return node.children.every(isCustomTextEmpty)
    if (node.type === 'math') return isMathEmpty(node)
    return false
  }
  return isCustomTextEmpty(node)
}

export function isTextPluginEmpty(plugin?: AnyEditorPlugin) {
  if (!plugin) return true
  const textState = (plugin as EditorTextPlugin).state
  if (textState.length === 0) return true
  return textState.every(isDescendantEmpty)
}
