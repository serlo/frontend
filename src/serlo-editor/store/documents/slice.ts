import { createSlice } from '@reduxjs/toolkit'

import type {
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
  pureInsertDocument,
  pureRemoveDocument,
  pureChangeDocument,
  pureReplaceDocument,
} = documentsSlice.actions
