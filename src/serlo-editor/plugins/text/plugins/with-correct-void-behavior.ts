import { Editor, Node, Path, Range, Transforms } from 'slate'

import { MathElement } from '../types/text-editor'

// Slate is not good with void block elements.
// https://github.com/ianstormtaylor/slate/issues/3991
export const withCorrectVoidBehavior = (editor: Editor) => {
  const { deleteBackward, deleteForward, insertBreak } = editor

  // If current selection is a void node, insert a default node below
  editor.insertBreak = () => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return insertBreak()
    }

    const selectedNodePath = Path.parent(editor.selection.anchor.path)
    const selectedNode = Node.get(editor, selectedNodePath)
    if (Editor.isVoid(editor, selectedNode as MathElement)) {
      Editor.insertNode(editor, {
        type: 'p',
        children: [{ text: '' }],
      })
      return
    }

    insertBreak()
  }

  // If previous node is a void node, remove the current node and select the void node
  editor.deleteBackward = (unit) => {
    if (
      !editor.selection ||
      !Range.isCollapsed(editor.selection) ||
      editor.selection.anchor.offset !== 0
    ) {
      return deleteBackward(unit)
    }

    const parentPath = Path.parent(editor.selection.anchor.path)
    const parentNode = Node.get(editor, parentPath)
    const parentIsEmpty = Node.string(parentNode).length === 0

    if (parentIsEmpty && Path.hasPrevious(parentPath)) {
      const prevNodePath = Path.previous(parentPath)
      const prevNode = Node.get(editor, prevNodePath)
      if (Editor.isVoid(editor, prevNode as MathElement)) {
        return Transforms.removeNodes(editor)
      }
    }

    deleteBackward(unit)
  }

  // If next node is a void node, remove the current node and select the void node
  editor.deleteForward = (unit) => {
    if (
      !editor.selection ||
      !Range.isCollapsed(editor.selection) ||
      editor.selection.anchor.offset !== 0
    ) {
      return deleteForward(unit)
    }

    const parentPath = Path.parent(editor.selection.anchor.path)
    const parentNode = Node.get(editor, parentPath)
    const parentIsEmpty = Node.string(parentNode).length === 0
    const nextNodePath = Path.next(parentPath)
    const nextNodeExists = Node.has(editor, nextNodePath)

    if (parentIsEmpty && nextNodeExists) {
      const nextNode = Node.get(editor, nextNodePath)
      if (Editor.isVoid(editor, nextNode as MathElement)) {
        return Transforms.removeNodes(editor)
      }
    }

    deleteForward(unit)
  }

  return editor
}
