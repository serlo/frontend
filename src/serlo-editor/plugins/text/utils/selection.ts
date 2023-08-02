import { Editor as SlateEditor, BaseRange, Point } from 'slate'

export function isSelectionAtStart(editor: SlateEditor, selection: BaseRange) {
  const firstPointInEditor = SlateEditor.start(editor, [0])
  return Point.compare(firstPointInEditor, selection.focus) > -1
}

export function isSelectionAtEnd(editor: SlateEditor, selection: BaseRange) {
  const childrenCount = editor.children.length
  const lastPointInEditor = SlateEditor.end(editor, [childrenCount - 1])
  return Point.compare(lastPointInEditor, selection.focus) < 1
}
