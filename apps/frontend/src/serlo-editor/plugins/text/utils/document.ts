import {
  BaseSelection,
  Descendant,
  Node,
  Editor as SlateEditor,
  Transforms,
} from 'slate'

import { isSelectionAtEnd } from './selection'
import type { TextEditorState } from '../types/config'
import { StateTypeValueType } from '@/serlo-editor/plugin'
import {
  focusNext,
  focusPrevious,
  selectDocument,
  selectChildTreeOfParent,
  selectMayManipulateSiblings,
  removePluginChild,
  selectChildTree,
  store,
} from '@/serlo-editor/store'

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
  id: string
) {
  const mayManipulateSiblings = selectMayManipulateSiblings(
    store.getState(),
    id
  )
  const parent = selectChildTreeOfParent(store.getState(), id)
  if (!mayManipulateSiblings || !parent) return

  const adjacentSibling = getAdjacentSiblingByDirection(id, direction)
  const adjacentDocument = selectDocument(store.getState(), adjacentSibling?.id)
  if (!adjacentSibling || !adjacentDocument) return

  // If the editor is empty, remove the current Slate instance
  // and focus the one it's been merged with
  if (Node.string(editor) === '' && editor.children.length <= 1) {
    const focusTree = selectChildTree(store.getState())
    const focusAction = direction === 'previous' ? focusPrevious : focusNext
    store.dispatch(focusAction(focusTree))
    store.dispatch(removePluginChild({ parent: parent.id, child: id }))
    return
  }

  const currentDocument = selectDocument(store.getState(), id)
  if (!currentDocument) return

  const allChildrenOfParent = parent.children || []
  const indexWithinParent = allChildrenOfParent.findIndex(
    (child) => child.id === id
  )

  if (direction === 'previous') {
    // Exit if text plugin is the first child of its parent
    const isFirstChild = indexWithinParent < 1
    if (isFirstChild) return

    // If previous and current plugin are both text plugins
    // merge them and return the merge value
    if (adjacentDocument.plugin === currentDocument.plugin) {
      const previousDocumentValue = (adjacentDocument.state as DocumentState)
        .value
      const previousDocumentChildrenCount = previousDocumentValue.length

      // Merge editor values
      const newValue = [...previousDocumentValue, ...editor.children]

      // Set the merge value to current Slate instance
      editor.children = newValue

      // Remove the merged plugin
      store.dispatch(
        removePluginChild({
          parent: parent.id,
          child: adjacentSibling.id,
        })
      )

      // New selection should start at the point where the plugins merged
      const newSelection: BaseSelection = {
        anchor: {
          offset: 0,
          path: [previousDocumentChildrenCount, 0],
        },
        focus: {
          offset: 0,
          path: [previousDocumentChildrenCount, 0],
        },
      }

      // Return the merge value
      return {
        value: newValue,
        selection: newSelection,
      }
    }
  } else {
    // Exit if text plugin is the last child of its parent
    const isLastChild = indexWithinParent + 1 >= allChildrenOfParent.length
    if (isLastChild) return

    // If next and current plugin are both text plugins
    // merge them and return the merge value
    if (adjacentDocument.plugin === currentDocument.plugin) {
      const nextDocumentValue = (adjacentDocument.state as DocumentState).value

      // Merge editor values
      const newValue = [...editor.children, ...nextDocumentValue]

      // Set the merge value to current Slate instance
      editor.children = newValue

      // Remove the merged plugin
      store.dispatch(
        removePluginChild({ parent: parent.id, child: adjacentSibling.id })
      )

      // Return the merge value
      return {
        value: newValue,
        selection: editor.selection,
      }
    }
  }
}

function getAdjacentSiblingByDirection(
  id: string,
  direction: 'previous' | 'next'
) {
  const parent = selectChildTreeOfParent(store.getState(), id)
  const allChildrenOfParent = parent?.children || []
  const indexWithinParent = allChildrenOfParent.findIndex(
    (child) => child.id === id
  )
  const index =
    direction === 'previous' ? indexWithinParent - 1 : indexWithinParent + 1
  return allChildrenOfParent[index]
}
