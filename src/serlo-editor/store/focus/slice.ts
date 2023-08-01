import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { findNextNode, findPreviousNode } from './helpers'
import { PluginTreeNode } from './types'
import { isPureInsertDocumentAction } from '../documents'
import { State } from '../types'

const initialState: State['focus'] = null as State['focus']

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    focus(_state, action: PayloadAction<string | null>) {
      return action.payload
    },
    focusNext(state, action: PayloadAction<PluginTreeNode | null>) {
      if (!state || !action.payload) return state
      const next = findNextNode(action.payload, state)
      if (!next) return state
      return next
    },
    focusPrevious(state, action: PayloadAction<PluginTreeNode | null>) {
      if (!state || !action.payload) return state
      const next = findPreviousNode(action.payload, state)
      if (!next) return state
      return next
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      // Always focus the newly inserted document
      isPureInsertDocumentAction,
      (_state, action) => action.payload.id
    )
  },
})

export const { focus, focusNext, focusPrevious } = focusSlice.actions
