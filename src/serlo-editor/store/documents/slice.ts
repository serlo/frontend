import { createSlice } from '@reduxjs/toolkit'

import type {
  InsertAndFocusDocumentAction,
  PureChangeDocumentAction,
  PureInsertDocumentAction,
  PureRemoveDocumentAction,
  PureReplaceDocumentAction,
} from './types'
import { State } from '../types'

const initialState: State['documents'] = {}

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    // The insert action with a side effect:
    // Focus the newly inserted document (see `focus` slice)
    insertAndFocusDocument(state, action: InsertAndFocusDocumentAction) {
      const { id, plugin: type, state: pluginState } = action.payload
      state[id] = {
        plugin: type,
        state: pluginState,
      }
    },
    // The pure insert action (no side effects)
    pureInsertDocument(state, action: PureInsertDocumentAction) {
      const { id, plugin: type, state: pluginState } = action.payload
      state[id] = {
        plugin: type,
        state: pluginState,
      }
    },
    pureRemoveDocument(state, action: PureRemoveDocumentAction) {
      delete state[action.payload]
    },
    pureChangeDocument(state, action: PureChangeDocumentAction) {
      const { id, state: pluginState } = action.payload
      if (!state[id]) return state
      state[id].state = pluginState
    },
    pureReplaceDocument(state, action: PureReplaceDocumentAction) {
      const { id, plugin: type, state: pluginState } = action.payload
      state[id] = {
        plugin: type,
        state: pluginState,
      }
    },
  },
})

export const {
  insertAndFocusDocument,
  pureInsertDocument,
  pureRemoveDocument,
  pureChangeDocument,
  pureReplaceDocument,
} = documentsSlice.actions
