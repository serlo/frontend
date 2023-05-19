import { createSlice } from '@reduxjs/toolkit'

import { State } from '../types'
import type {
  PureChangeActionPayload,
  PureInsertActionPayload,
  PureRemoveActionPayload,
  PureWrapActionPayload,
  PureUnwrapActionPayload,
  PureReplaceActionPayload,
  PureReplaceTextActionPayload,
} from './types'

const initialState: State['documents'] = {}

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    pureInsert(state, action: PureInsertActionPayload) {
      const { id, plugin: type, state: pluginState } = action.payload

      state[id] = {
        plugin: type,
        state: pluginState,
      }
    },
    pureRemove(state, action: PureRemoveActionPayload) {
      delete state[action.payload]
    },
    pureChange(state, action: PureChangeActionPayload) {
      const { id, state: pluginState } = action.payload
      if (!state[id]) return state

      state[id].state = pluginState
    },
    pureWrap(state, action: PureWrapActionPayload) {
      const { id, newId, document } = action.payload
      if (!state[id]) return state

      state[newId] = state[id]
      state[id] = document
    },
    pureUnwrap(state, action: PureUnwrapActionPayload) {
      const { id, oldId } = action.payload
      if (!state[oldId]) return state

      state[id] = state[oldId]
      delete state[oldId]
    },
    pureReplace(state, action: PureReplaceActionPayload) {
      const { id, plugin: type, state: pluginState } = action.payload

      state[id] = {
        plugin: type,
        state: pluginState,
      }
    },
    pureReplaceText(state, action: PureReplaceTextActionPayload) {
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
  pureWrap,
  pureUnwrap,
  pureReplace,
  pureReplaceText,
} = documentsSlice.actions
