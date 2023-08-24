import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { findNextNode, findPreviousNode } from './helpers'
import { FocusTreeNode } from './types'
import { State } from '../types'

const initialState: State['focus'] = null as State['focus']

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    focus(_state, action: PayloadAction<string | null>) {
      return action.payload
    },
    focusNext(state, action: PayloadAction<FocusTreeNode | null>) {
      if (!state || !action.payload) return state
      const next = findNextNode(action.payload, state)
      if (!next) return state
      return next
    },
    focusPrevious(state, action: PayloadAction<FocusTreeNode | null>) {
      if (!state || !action.payload) return state
      const next = findPreviousNode(action.payload, state)
      if (!next) return state
      return next
    },
  },
})

export const { focus, focusNext, focusPrevious } = focusSlice.actions
