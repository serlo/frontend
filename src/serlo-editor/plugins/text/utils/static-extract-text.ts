import type { Descendant } from 'slate'

import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import { SupportedEditorPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function extractDescendant(node: Descendant): string {
  if (Object.hasOwn(node, 'type') && Object.hasOwn(node, 'children')) {
    return node.children.map(extractDescendant).join(' ')
  }
  return node.text
}

export function extractStringFromTextPlugin(document?: SupportedEditorPlugin) {
  if (
    !document ||
    document.plugin !== EditorPluginType.Text ||
    !document.state.length
  ) {
    return ''
  }

  return document.state.map(extractDescendant).join(' ').trim()
}
