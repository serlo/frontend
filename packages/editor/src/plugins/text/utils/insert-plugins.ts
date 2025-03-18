import {
  insertPluginChildAfter,
  runReplaceDocumentSaga,
  selectDocument,
  selectMayManipulateSiblings,
  selectChildTreeOfParent,
  type RootState,
} from '@editor/store'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { reverse } from 'ramda'
import { Editor as SlateEditor, Node } from 'slate'

import { sliceNodesAfterSelection } from './document'

export interface insertPluginsArgs {
  plugins: Array<{ pluginType: string; state?: unknown }>
  editor: SlateEditor
  id: string
  getStoreState: () => RootState
  dispatch: ThunkDispatch<unknown, unknown, Action<string>>
}

export function insertPlugins({
  plugins,
  editor,
  id,
  getStoreState,
  dispatch,
}: insertPluginsArgs) {
  if (!plugins.length) return

  const storeState = getStoreState()

  const document = selectDocument(storeState, id)
  const mayManipulateSiblings = selectMayManipulateSiblings(storeState, id)
  const parent = selectChildTreeOfParent(storeState, id)

  if (!document || !mayManipulateSiblings || !parent) return
  const parentPluginType = document.plugin
  const reversedPlugins = reverse(plugins)

  const isEditorEmpty =
    Node.string(editor) === '' || Node.string(editor) === '/'

  if (isEditorEmpty) replaceCurrentTextPlugin()
  else splitCurrentTextPlugin(parent.id)

  for (const { pluginType, state } of reversedPlugins) {
    dispatch(
      insertPluginChildAfter({
        parent: parent.id,
        sibling: id,
        document: { plugin: pluginType, state },
      })
    )
  }

  function replaceCurrentTextPlugin() {
    const firstPlugin = reversedPlugins.pop()
    const { pluginType, state } = firstPlugin!
    dispatch(runReplaceDocumentSaga({ id, pluginType, state }))
  }

  function splitCurrentTextPlugin(parentId: string) {
    const slicedNodes = sliceNodesAfterSelection(editor)

    if (slicedNodes) {
      const cleanSlicedNodes = Node.string(slicedNodes[0]).length
        ? slicedNodes
        : slicedNodes.slice(1)
      if (!cleanSlicedNodes.length) return
      dispatch(
        insertPluginChildAfter({
          parent: parentId,
          sibling: id,
          document: {
            plugin: parentPluginType,
            state: cleanSlicedNodes,
          },
        })
      )
    }
  }
}
