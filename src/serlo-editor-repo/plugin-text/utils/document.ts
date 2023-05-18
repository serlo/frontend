import { Descendant, Node, Editor as SlateEditor, Transforms } from 'slate'

import { StateTypeValueType } from '../../plugin'
import type { TextEditorState } from '../types'
import { isSelectionAtEnd } from './selection'
import {
  Store,
  focusNext,
  focusPrevious,
  getDocument,
  getParent,
  mayInsertChild,
  mayRemoveChild,
  removeChild,
} from '@/serlo-editor-repo/store'

interface DocumentState {
  value: Descendant[]
}

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

export function mergePlugins(
  direction: 'previous' | 'next',
  editor: SlateEditor,
  store: Store,
  id: string
) {
  const mayRemove = mayRemoveChild(id)(store.getState())
  const parent = getParent(id)(store.getState())
  if (!mayRemove || !parent) return

  // If the editor is empty, remove the current Slate instance
  // and focus the one it's been merged with
  if (Node.string(editor) === '') {
    const focusAction = direction === 'previous' ? focusPrevious : focusNext
    store.dispatch(focusAction())
    store.dispatch(removeChild({ parent: parent.id, child: id }))
    return
  }

  const mayInsert = mayInsertChild(id)(store.getState())
  const currentDocument = getDocument(id)(store.getState())
  if (!mayInsert || !currentDocument) return

  const allChildrenOfParent = parent.children || []
  const indexWithinParent = allChildrenOfParent.findIndex(
    (child) => child.id === id
  )

  if (direction === 'previous') {
    // Exit if text plugin is the first child of its parent
    const isFirstChild = indexWithinParent < 1
    if (isFirstChild) return

    // Exit if unable to get value of previous sibling
    const previousSibling = allChildrenOfParent[indexWithinParent - 1]
    const previousDocument = getDocument(previousSibling.id)(store.getState())
    if (!previousDocument) return

    // If previous and current plugin are both text plugins
    // merge them and return the merge value
    if (previousDocument.plugin === currentDocument.plugin) {
      const previousDocumentValue = (previousDocument.state as DocumentState)
        .value
      const previousDocumentChildrenCount = previousDocumentValue.length

      // Merge editor values
      const newValue = [...previousDocumentValue, ...editor.children]

      // Set the merge value to current Slate instance
      editor.children = newValue

      setTimeout(() => {
        // Remove the merged plugin
        store.dispatch(
          removeChild({ parent: parent.id, child: previousSibling.id })
        )
        // Set selection where it was before the merge
        Transforms.select(editor, {
          offset: 0,
          path: [previousDocumentChildrenCount, 0],
        })
      })

      // Return the merge value
      return newValue
    }
  } else {
    // Exit if text plugin is the last child of its parent
    const isLastChild = indexWithinParent + 1 >= allChildrenOfParent.length
    if (isLastChild) return

    // Exit if unable to get value of next sibling
    const nextSibling = allChildrenOfParent[indexWithinParent + 1]
    const nextDocument = getDocument(nextSibling.id)(store.getState())
    if (!nextDocument) return

    // If next and current plugin are both text plugins
    // merge them and return the merge value
    if (nextDocument.plugin === currentDocument.plugin) {
      const nextDocumentValue = (nextDocument.state as DocumentState).value

      // Merge editor values
      const newValue = [...editor.children, ...nextDocumentValue]

      // Set the merge value to current Slate instance
      editor.children = newValue

      setTimeout(() => {
        // Remove the merged plugin
        store.dispatch(
          removeChild({ parent: parent.id, child: nextSibling.id })
        )
      })

      // Return the merge value
      return newValue
    }
  }
}
