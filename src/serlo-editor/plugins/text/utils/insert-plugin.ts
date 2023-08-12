import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { Editor as SlateEditor, Node } from 'slate'

import { sliceNodesAfterSelection } from './document'
import {
  RootStore,
  insertPluginChildAfter,
  runReplaceDocumentSaga,
  selectDocument,
  selectMayManipulateSiblings,
  selectParent,
} from '@/serlo-editor/store'

export interface insertPluginArgs {
  pluginType: string
  editor: SlateEditor
  store: RootStore
  id: string
  dispatch: ThunkDispatch<unknown, unknown, Action<unknown>>
  state?: unknown
}

export function insertPlugin({
  pluginType,
  editor,
  store,
  id,
  dispatch,
  state,
}: insertPluginArgs) {
  const storeState = store.getState() as unknown

  const document = selectDocument(storeState, id)
  const mayManipulateSiblings = selectMayManipulateSiblings(storeState, id)
  const parent = selectParent(storeState, id)

  if (!document || !mayManipulateSiblings || !parent) return
  const parentPluginType = document.plugin

  const isEditorEmpty =
    Node.string(editor) === '' || Node.string(editor) === '/'

  if (mayManipulateSiblings && isEditorEmpty) {
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
