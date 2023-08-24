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
      const _id = document.activeElement?.closest(
        '.plugin-wrapper-container'
      )?.id
      const next = findNextNode(action.payload, _id ?? state)
      if (!next) return state
      const nextDomElement = document.getElementById(next) as HTMLDivElement
      nextDomElement?.focus()
      return state // make sure we don't use old logic
    },
    focusPrevious(state, action: PayloadAction<FocusTreeNode | null>) {
      if (!state || !action.payload) return state
      const _id = document.activeElement?.closest(
        '.plugin-wrapper-container'
      )?.id
      const previous = findPreviousNode(action.payload, _id ?? state)
      if (!previous) return state
      const previousDomElement = document.getElementById(
        previous
      ) as HTMLDivElement
      previousDomElement?.focus()
      return state // make sure we don't use old logic
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
