import {
  insertPluginChildAfter,
  runReplaceDocumentSaga,
  selectDocument,
  selectMayManipulateSiblings,
  selectChildTreeOfParent,
  store,
} from '@editor/store'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { Editor as SlateEditor, Node } from 'slate'

import { sliceNodesAfterSelection } from './document'

export interface insertPluginArgs {
  pluginType: string
  editor: SlateEditor
  id: string
  dispatch: ThunkDispatch<unknown, unknown, Action<unknown>>
  state?: unknown
}

export function insertPlugin({
  pluginType,
  editor,
  id,
  dispatch,
  state,
}: insertPluginArgs) {
  const storeState = store.getState()

  const document = selectDocument(storeState, id)
  const mayManipulateSiblings = selectMayManipulateSiblings(storeState, id)
  const parent = selectChildTreeOfParent(storeState, id)

  if (!document || !mayManipulateSiblings || !parent) return
  const parentPluginType = document.plugin

  const isEditorEmpty =
    Node.string(editor) === '' || Node.string(editor) === '/'

  if (isEditorEmpty) {
    dispatch(runReplaceDocumentSaga({ id, pluginType, state }))
    return
  }

  const slicedNodes = sliceNodesAfterSelection(editor)

  if (slicedNodes) {
    const cleanSlicedNodes = Node.string(slicedNodes[0]).length
      ? slicedNodes
      : slicedNodes.slice(1)
    if (cleanSlicedNodes.length) {
      dispatch(
        insertPluginChildAfter({
          parent: parent.id,
          sibling: id,
          document: {
            plugin: parentPluginType,
            state: cleanSlicedNodes,
          },
        })
      )
    }
  }

  dispatch(
    insertPluginChildAfter({
      parent: parent.id,
      sibling: id,
      document: { plugin: pluginType, state },
    })
  )
}
