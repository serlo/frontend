import { createSelector } from '@reduxjs/toolkit'

import { selectSerializedDocument } from '../documents'
import { State } from '../types'
import { PluginsContextPlugins } from '@/serlo-editor/core/contexts/plugins-context'

const selectSelf = (state: State) => state.root

export const selectRoot = createSelector(selectSelf, (root) => root)

export const selectSerializedRootDocument = createSelector(
  [
    (state: State) => state,
    (state: State, plugins: PluginsContextPlugins) => plugins,
  ],
  (state, plugins) => {
    if (!state.root) return null
    return selectSerializedDocument(state, { plugins, id: state.root })
  }
)
