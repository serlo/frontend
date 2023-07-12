import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as R from 'ramda'

import { selectRedoStack, selectUndoStack } from './selectors'
import type {
  PersistHistoryAction,
  PureCommitActionToHistoryAction,
} from './types'
import type { AppDispatch } from '../store'
import type { State } from '../types'

const initialState: State['history'] = {
  undoStack: [],
  redoStack: [],
  pendingChanges: 0,
}

export const undo = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State }
>('history/undo', (_, { getState, dispatch }) => {
  const undoStack = selectUndoStack(getState())
  const toUndo = R.head(undoStack)
  if (!toUndo) return
  const actions = R.reverse(toUndo).map(
    (reversibleAction) => reversibleAction.reverse
  )

  actions.map((action) => {
    dispatch(action)
  })
})

export const redo = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State }
>('history/redo', (_, { getState, dispatch }) => {
  const undoStack = selectRedoStack(getState())
  const toRedo = R.head(undoStack)
  if (!toRedo) return
  const actions = toRedo.map((reversibleAction) => reversibleAction.action)

  actions.map((action) => {
    dispatch(action)
  })
})

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    persistHistory(state, action: PersistHistoryAction) {
      state.initialState = state.initialState || {
        documents: action.payload,
      }
      state.pendingChanges = 0
    },
    pureCommitActionToHistory: (
      state,
      action: PureCommitActionToHistoryAction
    ) => {
      const { combine, actions } = action.payload
      let actionsToCommit = actions
      const { undoStack } = state

      state.undoStack = calculateNewUndoStack()
      state.redoStack = []
      state.pendingChanges = state.pendingChanges + actions.length

      function calculateNewUndoStack() {
        if (combine && undoStack.length > 0) {
          const previousActions = undoStack[0]
          actionsToCommit = [...previousActions, ...actionsToCommit]
          return [actionsToCommit, ...R.tail(undoStack)]
        }

        return [actionsToCommit, ...undoStack]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(undo.fulfilled, (state) => {
        const [actions, ...remainingUndoStack] = state.undoStack

        if (!actions) return state

        state.undoStack = remainingUndoStack
        state.redoStack = [actions, ...state.redoStack]
        state.pendingChanges = state.pendingChanges - actions.length
      })
      .addCase(redo.fulfilled, (state) => {
        const [actions, ...remainingRedoStack] = state.redoStack

        if (!actions) return state

        state.undoStack = [actions, ...state.undoStack]
        state.redoStack = remainingRedoStack
        state.pendingChanges = state.pendingChanges + actions.length
      })
  },
})

export const { persistHistory, pureCommitActionToHistory } =
  historySlice.actions
