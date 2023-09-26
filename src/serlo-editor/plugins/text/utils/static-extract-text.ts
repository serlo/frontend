import type { Descendant } from 'slate'

import { AnyEditorPlugin } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorTextPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function extractDescendant(node: Descendant): string {
  if (Object.hasOwn(node, 'type') && Object.hasOwn(node, 'children')) {
    return node.children.map(extractDescendant).join(' ')
  }
  return node.text
}

export function extractStringFromTextPlugin(plugin?: AnyEditorPlugin) {
  if (!plugin) return ''
  const textState = (plugin as EditorTextPlugin).state
  if (textState.length === 0) return ''

  return textState.map(extractDescendant).join(' ')
}
