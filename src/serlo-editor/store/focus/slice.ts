import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { findNextNode, findPreviousNode } from './helpers'
import { FocusTreeNode } from './types'
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
    focusNext(state, action: PayloadAction<FocusTreeNode | null>) {
      if (!state || !action.payload) return state
      const next = findNextNode(action.payload, state)
      if (!next) return state
      const nextDomElement = document.getElementById(next) as HTMLDivElement
      nextDomElement?.focus()
      return next
    },
    focusPrevious(state, action: PayloadAction<FocusTreeNode | null>) {
      if (!state || !action.payload) return state
      const previous = findPreviousNode(action.payload, state)
      if (!previous) return state
      const previousDomElement = document.getElementById(
        previous
      ) as HTMLDivElement
      previousDomElement?.focus()
      return previous
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
