import { Editor as SlateEditor, Element, Range, Transforms } from 'slate'

import { existsInAncestors } from './document'

export function selectionHasElement(
  predicate: (element: Element) => boolean,
  editor: SlateEditor
) {
  if (!editor.selection) return false

  return existsInAncestors(
    predicate,
    { location: SlateEditor.unhangRange(editor, editor.selection) },
    editor
  )
}

export function trimSelection(editor: SlateEditor): Range | null {
  const selection = editor.selection

  if (!selection) return null

  let selectedText = SlateEditor.string(editor, selection)
  const isBackwardSelection = Range.isBackward(selection)
  let anchorOffset = selection.anchor.offset
  let focusOffset = selection.focus.offset

  while (selectedText.startsWith(' ')) {
    isBackwardSelection ? focusOffset++ : anchorOffset++
    selectedText = selectedText.substring(1)
  }
  while (selectedText.endsWith(' ')) {
    isBackwardSelection ? anchorOffset-- : focusOffset--
    selectedText = selectedText.substring(0, selectedText.length - 1)
  }

  const trimmedSelection = {
    anchor: { ...selection.anchor, offset: anchorOffset },
    focus: { ...selection.focus, offset: focusOffset },
  }

  Transforms.setSelection(editor, trimmedSelection)

  return trimmedSelection
}
