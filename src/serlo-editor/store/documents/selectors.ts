import { createSelector } from '@reduxjs/toolkit'
import * as R from 'ramda'

import { StoreSerializeHelpers } from '../../types/internal__plugin-state'
import { createDeepEqualSelector } from '../helpers'
import { selectPlugin } from '../plugins'
import { State } from '../types'

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
  [(state: State) => state, (_state, id: string) => id],
  (state: State, id) => {
    const doc = selectDocument(state, id)
    if (!doc) return null
    const plugin = selectPlugin(state, doc.plugin)
    if (!plugin) return null
    const serializeHelpers: StoreSerializeHelpers = {
      getDocument: (id: string) => selectSerializedDocument(state, id),
    }
    return {
      plugin: doc.plugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state: plugin.state.serialize(doc.state, serializeHelpers),
    }
  }
)

export const selectSerializedDocumentWithoutIds = createDeepEqualSelector(
  [(state: State) => state, (_state, id: string) => id],
  (state: State, id) => {
    const doc = selectDocument(state, id)
    if (!doc) return null
    const plugin = selectPlugin(state, doc.plugin)
    if (!plugin) return null
    const serializeHelpers: StoreSerializeHelpers = {
      getDocument: (id: string) =>
        selectSerializedDocumentWithoutIds(state, id),
      omitId: true,
    }

    return {
      plugin: doc.plugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state: plugin.state.serialize(doc.state, serializeHelpers),
    }
  }
)

export const selectIsDocumentEmpty = createSelector(
  [(state: State) => state, (_state, id: string) => id],
  (state, id: string) => {
    const doc = selectDocument(state, id)
    if (!doc) return false

    const plugin = selectPlugin(state, doc.plugin)
    if (!plugin) return false

    if (typeof plugin.isEmpty === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const state = plugin.state.init(doc.state, () => {})
      return plugin.isEmpty(state)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const initialState = plugin.state.createInitialState({
      createDocument: () => {},
    })
    return R.equals(doc.state, initialState)
  }
)
