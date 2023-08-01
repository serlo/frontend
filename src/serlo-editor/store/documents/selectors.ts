import { createSelector } from '@reduxjs/toolkit'
import * as R from 'ramda'

import { StoreSerializeHelpers } from '../../types/internal__plugin-state'
import { createDeepEqualSelector } from '../helpers'
import { State } from '../types'
import {
  PluginsContextPlugins,
  getPluginByType,
} from '@/serlo-editor/core/contexts/plugins-context'
import { EditorPlugin } from '@/serlo-editor/plugin'

interface DocumentsSelectorArgs {
  plugins: PluginsContextPlugins
  id: string
}

const selectSelf = (state: State) => state.documents

export const selectDocuments = createSelector(
  selectSelf,
  (documents) => documents
)

export const selectDocument = createSelector(
  [selectSelf, (_state, id: string | null) => id],
  (documents, id) => {
    if (!id) return null
    return documents[id] || null
  }
)

export const selectSerializedDocument = createDeepEqualSelector(
  [(state: State) => state, (_state, args: DocumentsSelectorArgs) => args],
  (state: State, { plugins, id }) => {
    const document = selectDocument(state, id)
    if (!document) return null
    const plugin = getPluginByType(plugins, document.plugin)
    if (!plugin) return null
    const serializeHelpers: StoreSerializeHelpers = {
      getDocument: (id: string) =>
        selectSerializedDocument(state, { plugins, id }),
    }
    return {
      plugin: document.plugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state: (plugin.plugin as EditorPlugin).state.serialize(
        document.state,
        serializeHelpers
      ),
    }
  }
)

export const selectSerializedDocumentWithoutIds = createDeepEqualSelector(
  [(state: State) => state, (_state, args: DocumentsSelectorArgs) => args],
  (state: State, { plugins, id }) => {
    const document = selectDocument(state, id)
    if (!document) return null
    const plugin = getPluginByType(plugins, document.plugin)
    if (!plugin) return null
    const serializeHelpers: StoreSerializeHelpers = {
      getDocument: (id: string) =>
        selectSerializedDocumentWithoutIds(state, { plugins, id }),
      omitId: true,
    }

    return {
      plugin: document.plugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state: (plugin.plugin as EditorPlugin).state.serialize(
        document.state,
        serializeHelpers
      ),
    }
  }
)

export const selectIsDocumentEmpty = createSelector(
  [(state: State) => state, (_state, args: DocumentsSelectorArgs) => args],
  (state, { plugins, id }) => {
    const document = selectDocument(state, id)
    if (!document) return false

    const plugin = getPluginByType(plugins, document.plugin)
    if (!plugin) return false

    const pluginData = plugin.plugin as EditorPlugin
    if (typeof pluginData.isEmpty === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const state = pluginData.state.init(document.state, () => {})
      return pluginData.isEmpty?.(state) || false
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const initialState = (
      plugin.plugin as EditorPlugin
    ).state.createInitialState({
      createDocument: () => {},
    })
    return R.equals(document.state, initialState)
  }
)
