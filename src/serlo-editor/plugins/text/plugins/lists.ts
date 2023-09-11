import {
  ListType,
  withLists as withListsPlugin,
  withListsReact,
} from '@prezly/slate-lists'
import { Editor as SlateEditor, Element, Node } from 'slate'

import {
  List,
  ListElementType,
  ListItem,
  ListItemText,
  Paragraph,
} from '../types/text-editor'

const createListItemTextNode = (
  props: Partial<ListItemText> = {}
): ListItemText => ({
  children: [{ text: '' }],
  ...props,
  type: ListElementType.LIST_ITEM_TEXT,
})

const createListItemNode = (props: Partial<ListItem> = {}): ListItem => ({
  children: [createListItemTextNode()],
  ...props,
  type: ListElementType.LIST_ITEM,
})

export const isListNode = (node: Node, type?: ListType): boolean => {
  if (type) {
    return Element.isElementType(node, type)
  }
  return (
    Element.isElementType(node, ListElementType.ORDERED_LIST) ||
    Element.isElementType(node, ListElementType.UNORDERED_LIST)
  )
}

export const createDefaultTextNode = (
  props: Partial<Paragraph> = {}
): Paragraph => {
  return { children: [{ text: '' }], ...props, type: 'p' }
}

export const withLists = (editor: SlateEditor) => {
  const editorWithListsPlugin = withListsPlugin({
    isConvertibleToListTextNode(node: Node) {
      return Element.isElementType(node, 'p')
    },
    isDefaultTextNode(node: Node) {
      return Element.isElementType(node, 'p')
    },
    isListNode,
    isListItemNode(node: Node) {
      return Element.isElementType(node, ListElementType.LIST_ITEM)
    },
    isListItemTextNode(node: Node) {
      return Element.isElementType(node, ListElementType.LIST_ITEM_TEXT)
    },
    createDefaultTextNode,
    createListNode(
      type: ListType = ListType.UNORDERED,
      props: Partial<List> = {}
    ) {
      const nodeType =
        type === ListType.ORDERED
          ? ListElementType.ORDERED_LIST
          : ListElementType.UNORDERED_LIST
      return {
        children: [createListItemNode()],
        ...props,
        type: nodeType,
      }
    },
    createListItemNode,
    createListItemTextNode,
  })

  const { normalizeNode } = editor
  editor.normalizeNode = (entry) => {
    const children = editor.children

    // Always keep an empty line in front of list elements at the start of the block
    // This way we avoid list related merging issues
    if (children.length > 0) {
      const firstChild = children[0]
      if (isListNode(firstChild)) {
        editor.insertNode(createDefaultTextNode(), { at: [0] })
      }
    }

    normalizeNode(entry)
  }

  return withListsReact(editorWithListsPlugin(editor))
}
