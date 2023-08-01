import { createSelector } from '@reduxjs/toolkit'

import { selectDocument } from '../documents'
import { findParent, selectDocumentTree } from '../focus'
import { State } from '../types'
import { PluginsContextPlugins } from '@/serlo-editor/core/contexts/plugins-context'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface selectMayManipulateSiblingsArgs {
  plugins: PluginsContextPlugins
  id: string
}
export const selectMayManipulateSiblings = createSelector(
  [
    (state: State) => state,
    (_state, args: selectMayManipulateSiblingsArgs) => args,
  ],
  (state, { plugins, id }) => {
    const root = selectDocumentTree(state, plugins)
    if (!root) return false
    const parent = findParent(root, id)
    if (!parent) return false
    const parentDocument = selectDocument(state, parent.id)
    return parentDocument?.plugin === EditorPluginType.Rows
  }
)
