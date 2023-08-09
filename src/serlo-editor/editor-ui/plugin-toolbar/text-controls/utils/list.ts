import { ListsEditor, ListType } from '@prezly/slate-lists'
import { Element, Editor as SlateEditor } from 'slate'
import { ReactEditor } from 'slate-react'

import { existsInAncestors } from './document'
import { ListElementType } from '@/serlo-editor/plugins/text/types/text-editor'

export function isElementWithinList(element: Element, editor: SlateEditor) {
  return existsInAncestors(
    (elem) =>
      elem.type === ListElementType.ORDERED_LIST ||
      elem.type === ListElementType.UNORDERED_LIST,
    { location: ReactEditor.findPath(editor, element) },
    editor
  )
}

export function isSelectionWithinList(
  editor: SlateEditor,
  listType?: ListElementType
) {
  if (!editor.selection) return false

  return existsInAncestors(
    (element) => {
      return listType
        ? element.type === listType
        : element.type === ListElementType.ORDERED_LIST ||
            element.type === ListElementType.UNORDERED_LIST
    },
    { location: SlateEditor.unhangRange(editor, editor.selection) },
    editor
  )
}

export function isSelectionWithinUnorderedList(editor: SlateEditor) {
  return isSelectionWithinList(editor, ListElementType.UNORDERED_LIST)
}

export function isSelectionWithinOrderedList(editor: SlateEditor) {
  return isSelectionWithinList(editor, ListElementType.ORDERED_LIST)
}

export function toggleOrderedList(editor: SlateEditor) {
  if (isSelectionWithinUnorderedList(editor)) {
    ListsEditor.unwrapList(editor)
    ListsEditor.wrapInList(editor, ListType.ORDERED)
  } else if (isSelectionWithinOrderedList(editor)) {
    ListsEditor.unwrapList(editor)
  } else {
    ListsEditor.wrapInList(editor, ListType.ORDERED)
  }
}

export function toggleUnorderedList(editor: SlateEditor) {
  if (isSelectionWithinOrderedList(editor)) {
    ListsEditor.unwrapList(editor)
    ListsEditor.wrapInList(editor, ListType.UNORDERED)
  } else if (isSelectionWithinUnorderedList(editor)) {
    ListsEditor.unwrapList(editor)
  } else {
    ListsEditor.wrapInList(editor, ListType.UNORDERED)
  }
}
