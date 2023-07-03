import {
  Descendant,
  Element,
  Node,
  Editor as SlateEditor,
  Transforms,
  Location,
} from 'slate'

import type { TextEditorState } from '../types'
import { isSelectionAtEnd } from './selection'
import { StateTypeValueType } from '@/serlo-editor/plugin'
import {
  focusNext,
  focusPrevious,
  selectDocument,
  selectParent,
  selectMayManipulateSiblings,
  removePluginChild,
  RootStore,
  selectFocusTree,
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
  store: RootStore,
  id: string
) {
  const mayManipulateSiblings = selectMayManipulateSiblings(
    store.getState(),
    id
  )
  const parent = selectParent(store.getState(), id)
  if (!mayManipulateSiblings || !parent) return

  // If the editor is empty, remove the current Slate instance
  // and focus the one it's been merged with
  if (Node.string(editor) === '') {
    const focusTree = selectFocusTree(store.getState())
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

    // Exit if unable to get value of previous sibling
    const previousSibling = allChildrenOfParent[indexWithinParent - 1]
    const previousDocument = selectDocument(
      store.getState(),
      previousSibling.id
    )
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

      // Remove the merged plugin
      store.dispatch(
        removePluginChild({ parent: parent.id, child: previousSibling.id })
      )

      // Set selection to where it was before the merge
      setTimeout(() => {
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
    const nextDocument = selectDocument(store.getState(), nextSibling.id)
    if (!nextDocument) return

    // If next and current plugin are both text plugins
    // merge them and return the merge value
    if (nextDocument.plugin === currentDocument.plugin) {
      const nextDocumentValue = (nextDocument.state as DocumentState).value

      // Merge editor values
      const newValue = [...editor.children, ...nextDocumentValue]

      // Set the merge value to current Slate instance
      editor.children = newValue

      // Remove the merged plugin
      store.dispatch(
        removePluginChild({ parent: parent.id, child: nextSibling.id })
      )

      // Return the merge value
      return newValue
    }
  }
}

export function existsInAncestors(
  predicate: (element: Element) => boolean,
  { location }: { location: Location },
  editor: SlateEditor
) {
  const matchingNodes = Array.from(
    SlateEditor.nodes(editor, {
      at: location,
      match: (node) =>
        !SlateEditor.isEditor(node) &&
        Element.isElement(node) &&
        predicate(node),
    })
  )

  return matchingNodes.length !== 0
}
