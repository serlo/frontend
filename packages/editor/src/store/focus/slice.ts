import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { findNextChildTreeNode, findPreviousChildTreeNode } from './helpers'
import {
  type ChildTreeNode,
  isInsertAndFocusDocumentAction,
} from '../documents'
import { State } from '../types'

const initialState: State['focus'] = null as State['focus']

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    focus(_state, action: PayloadAction<string | null>) {
      return action.payload
    },
    focusNext(state, action: PayloadAction<ChildTreeNode | null>) {
      if (!state || !action.payload) return state
      const next = findNextChildTreeNode(action.payload, state)
      console.log('Next: ', { next, state })
      if (!next) return state
      return next
    },
    focusPrevious(state, action: PayloadAction<ChildTreeNode | null>) {
      if (!state || !action.payload) return state
      const previous = findPreviousChildTreeNode(action.payload, state)
      console.log('Previous: ', { previous, state })
      if (!previous) return state
      return previous
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      // Always focus the newly inserted document
      isInsertAndFocusDocumentAction,
      (_state, action) => {
        return action.payload.id
      }
    )
  },
})

export const { focus, focusNext, focusPrevious } = focusSlice.actions
