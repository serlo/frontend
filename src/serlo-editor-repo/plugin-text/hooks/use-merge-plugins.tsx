import { Descendant, Node, Editor as SlateEditor, Transforms } from 'slate'

import {
  focusNext,
  focusPrevious,
  removePluginChild,
  selectDocument,
  selectFocusTree,
  selectMayManipulateSiblings,
  selectParent,
} from '@/serlo-editor-repo/store'
import { useAppDispatch, useAppSelector } from '@/serlo-editor-repo/store/store'

interface TextPluginDocumentState {
  value: Descendant[]
}

export function useMergePlugins(editor: SlateEditor, id: string) {
  const dispatch = useAppDispatch()
  const parent = useAppSelector((state) => selectParent(state, id))
  const allChildrenOfParent = parent?.children || []
  const indexWithinParent = allChildrenOfParent.findIndex(
    (child) => child.id === id
  )
  const previousSibling = allChildrenOfParent[indexWithinParent - 1]
  const nextSibling = allChildrenOfParent[indexWithinParent + 1]
  const previousDocument = useAppSelector((state) =>
    selectDocument(state, previousSibling?.id)
  )
  const nextDocument = useAppSelector((state) =>
    selectDocument(state, nextSibling?.id)
  )
  const mayManipulateSiblings = useAppSelector((state) =>
    selectMayManipulateSiblings(state, id)
  )
  const focusTree = useAppSelector(selectFocusTree)

  function mergePlugins(direction: 'previous' | 'next') {
    if (!mayManipulateSiblings || !parent) return

    // If the editor is empty, remove the current Slate instance
    // and focus the one it's been merged with
    if (Node.string(editor) === '') {
      const focusAction = direction === 'previous' ? focusPrevious : focusNext
      dispatch(focusAction(focusTree))
      dispatch(removePluginChild({ parent: parent.id, child: id }))
      return
    }

    let newValue: Descendant[]

    if (direction === 'previous') {
      // Exit if current text plugin is the first child of its parent
      const isFirstChild = indexWithinParent < 1
      if (isFirstChild || !previousDocument) return

      // Exit if previous plugin is not text plugin
      if (previousDocument.plugin !== 'text') return

      const { value: previousDocumentValue } =
        previousDocument.state as TextPluginDocumentState

      // Merge editor values
      newValue = [...previousDocumentValue, ...editor.children]

      // Remove the merged plugin
      dispatch(
        removePluginChild({ parent: parent.id, child: previousSibling.id })
      )
      // Set selection where it was before the merge
      Transforms.select(editor, {
        offset: 0,
        path: [previousDocumentValue.length, 0],
      })
    } else {
      // Exit if current text plugin is the last child of its parent
      const isLastChild = indexWithinParent + 1 >= allChildrenOfParent.length
      if (isLastChild || !nextDocument) return

      // Exit if next plugin is not text plugin
      if (nextDocument.plugin !== 'text') return

      const { value: nextDocumentValue } =
        nextDocument.state as TextPluginDocumentState

      // Merge editor values
      newValue = [...editor.children, ...nextDocumentValue]

      // Remove the merged plugin
      dispatch(removePluginChild({ parent: parent.id, child: nextSibling.id }))
    }

    // Apply the merge value to current Slate instance
    editor.children = newValue

    // Return the merge value
    return newValue
  }

  return mergePlugins
}
