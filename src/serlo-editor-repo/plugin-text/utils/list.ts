import { ListsEditor, ListType } from '@prezly/slate-lists'
import { Element, Editor as SlateEditor } from 'slate'
import { ReactEditor } from 'slate-react'

import { existsInAncestors } from './document'

export function isElementWithinList(element: Element, editor: SlateEditor) {
  return existsInAncestors(
    (elem) => elem.type === 'unordered-list' || elem.type === 'ordered-list',
    { location: ReactEditor.findPath(editor, element) },
    editor
  )
}

export function isSelectionWithinList(
  editor: SlateEditor,
  listType?: 'unordered-list' | 'ordered-list'
) {
  if (!editor.selection) return false

  return existsInAncestors(
    (element) => {
      return listType
        ? element.type === listType
        : element.type === 'ordered-list' || element.type === 'unordered-list'
    },
    { location: SlateEditor.unhangRange(editor, editor.selection) },
    editor
  )
}

export function isSelectionWithinUnorderedList(editor: SlateEditor) {
  return isSelectionWithinList(editor, 'unordered-list')
}

export function isSelectionWithinOrderedList(editor: SlateEditor) {
  return isSelectionWithinList(editor, 'ordered-list')
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
