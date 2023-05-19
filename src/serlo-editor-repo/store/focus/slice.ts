import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { isPureInsertAction, isPureReplaceTextAction } from '../documents'
import { State } from '../types'
import { handleFocus, findNextNode, findPreviousNode } from './helpers'

const initialState: State['focus'] = null as State['focus']

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    blur() {
      return null
    },
    focus(_state, action: PayloadAction<string>) {
      return action.payload
    },
    focusNext(state, action: PayloadAction<State>) {
      return handleFocus(state, action.payload, findNextNode)
    },
    focusPrevious(state, action: PayloadAction<State>) {
      return handleFocus(state, action.payload, findPreviousNode)
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        // Always focus the newly inserted document
        isPureInsertAction,
        (_state, action) => action.payload.id
      )
      .addMatcher(
        // Always focus the document with replaced text
        isPureReplaceTextAction,
        (_state, action) => action.payload.newId
      )
  },
})

export const { blur, focus, focusNext, focusPrevious } = focusSlice.actions
