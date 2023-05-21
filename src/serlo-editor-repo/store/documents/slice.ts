import { createSlice } from '@reduxjs/toolkit'

import { State } from '../types'
import type {
  PureChangeAction,
  PureInsertAction,
  PureRemoveAction,
  PureReplaceAction,
  PureReplaceTextAction,
} from './types'

const initialState: State['documents'] = {}

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    pureInsert(state, action: PureInsertAction) {
      const { id, plugin: type, state: pluginState } = action.payload
      state[id] = {
        plugin: type,
        state: pluginState,
      }
    },
    pureRemove(state, action: PureRemoveAction) {
      delete state[action.payload]
    },
    pureChange(state, action: PureChangeAction) {
      const { id, state: pluginState } = action.payload
      if (!state[id]) return state
      state[id].state = pluginState
    },
    pureReplace(state, action: PureReplaceAction) {
      const { id, plugin: type, state: pluginState } = action.payload
      state[id] = {
        plugin: type,
        state: pluginState,
      }
    },
    pureReplaceText(state, action: PureReplaceTextAction) {
      const { id, newId, document } = action.payload
      if (!state[id]) return state
      state[newId] = state[id]
      state[id] = document
    },
  },
})

export const {
  pureInsert,
  pureRemove,
  pureChange,
  pureReplace,
  pureReplaceText,
} = documentsSlice.actions
