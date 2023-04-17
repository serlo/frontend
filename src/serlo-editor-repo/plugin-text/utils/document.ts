import { Editor as SlateEditor, Transforms } from 'slate'

import { StateTypeValueType } from '../../plugin'
import type { TextEditorState } from '../types'
import { isSelectionAtEnd } from './selection'

export const emptyDocumentFactory =
  (): StateTypeValueType<TextEditorState> => ({
    value: [{ type: 'p', children: [{ text: '' }] }],
    selection: null,
  })

export function sliceNodesAfterSelection(editor: SlateEditor) {
  if (!editor.selection) return

  let slicedNodes = null

  // Create a new line at selection
  SlateEditor.insertBreak(editor)

  const selectionPoint = editor.selection.anchor.path[0]
  const childrenCount = editor.children.length

  // If the initial selection was not at the end, save the sliced nodes
  if (!isSelectionAtEnd(editor, editor.selection)) {
    slicedNodes = editor.children.slice(selectionPoint, childrenCount)
  }

  // Remove the sliced nodes from the current Slate instance
  Transforms.removeNodes(editor, {
    at: {
      anchor: { offset: 0, path: [selectionPoint] },
      focus: { offset: 0, path: [childrenCount] },
    },
  })

  return slicedNodes
}
