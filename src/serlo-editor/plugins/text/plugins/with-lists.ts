import {
  ListType,
  withLists as withListsPlugin,
  withListsReact,
} from '@prezly/slate-lists'
import { Editor, Element, Node } from 'slate'

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

export const withLists = (editor: Editor) => {
  const editorWithListsPlugin = withListsPlugin({
    isConvertibleToListTextNode(node: Node) {
      return Element.isElementType(node, 'p')
    },
    isDefaultTextNode(node: Node) {
      return Element.isElementType(node, 'p')
    },
    isListNode(node: Node, type?: ListType) {
      if (type) {
        return Element.isElementType(node, type)
      }
      return (
        Element.isElementType(node, ListElementType.ORDERED_LIST) ||
        Element.isElementType(node, ListElementType.UNORDERED_LIST)
      )
    },
    isListItemNode(node: Node) {
      return Element.isElementType(node, ListElementType.LIST_ITEM)
    },
    isListItemTextNode(node: Node) {
      return Element.isElementType(node, ListElementType.LIST_ITEM_TEXT)
    },
    createDefaultTextNode(props: Partial<Paragraph> = {}) {
      return { children: [{ text: '' }], ...props, type: 'p' }
    },
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

  return withListsReact(editorWithListsPlugin(editor))
}
