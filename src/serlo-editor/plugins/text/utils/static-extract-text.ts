import type { Descendant } from 'slate'

import { AnyEditorPlugin } from '@/serlo-editor-integration/types/editor-plugins'
import { isTextDocument } from '@/serlo-editor-integration/types/plugin-type-guards'

export function extractDescendant(node: Descendant): string {
  if (Object.hasOwn(node, 'type') && Object.hasOwn(node, 'children')) {
    return node.children.map(extractDescendant).join(' ')
  }
  return node.text
}

export function extractStringFromTextPlugin(document?: AnyEditorPlugin) {
  if (document && isTextDocument(document) && document.state.length > 0) {
    return document.state.map(extractDescendant).join(' ').trim()
  }
  return ''
}
