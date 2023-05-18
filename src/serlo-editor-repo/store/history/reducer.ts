import * as R from 'ramda'

import { ReversibleAction } from '../actions'
import { getDocuments } from '../documents/reducer'
import { createSelector, createSubReducer, SubReducer } from '../helpers'
import { HistoryState, Selector } from '../types'
import {
  persist,
  PersistAction,
  pureCommit,
  PureCommitAction,
  pureRedo,
  PureRedoAction,
  pureUndo,
  PureUndoAction,
} from './actions'

export const historyReducer: SubReducer<HistoryState> = createSubReducer(
  'history',
  {
    undoStack: [],
    redoStack: [],
    pendingChanges: 0,
  },
  {
    [persist.type](historyState, _action: PersistAction, state) {
      return {
        ...historyState,
        initialState: historyState.initialState || {
          documents: getDocuments()(state),
        },
        pendingChanges: 0,
      }
    },
    [pureCommit.type](historyState, action: PureCommitAction) {
      const { combine, actions } = action.payload
      let actionsToCommit = actions
      const { undoStack } = historyState
      return {
        ...historyState,
        undoStack: calculateNewUndoStack(),
        redoStack: [],
        pendingChanges: historyState.pendingChanges + actions.length,
      }

      function calculateNewUndoStack() {
        if (combine && undoStack.length > 0) {
          const previousActions = undoStack[0]
          actionsToCommit = [...previousActions, ...actionsToCommit]
          return [actionsToCommit, ...R.tail(undoStack)]
        }

        return [actionsToCommit, ...undoStack]
      }
    },
    [pureUndo.type](historyState, _action: PureUndoAction) {
      const [actions, ...remainingUndoStack] = historyState.undoStack

      if (!actions) return historyState
      return {
        ...historyState,
        undoStack: remainingUndoStack,
        redoStack: [actions, ...historyState.redoStack],
        pendingChanges: historyState.pendingChanges - actions.length,
      }
    },
    [pureRedo.type](historyState, _action: PureRedoAction) {
      const [actions, ...remainingRedoStack] = historyState.redoStack

      if (!actions) return historyState
      return {
        ...historyState,
        undoStack: [actions, ...historyState.undoStack],
        redoStack: remainingRedoStack,
        pendingChanges: historyState.pendingChanges + actions.length,
      }
    },
  }
)

export const getPendingChanges: Selector<number> = createSelector(
  (state) => state.history.pendingChanges
)

export const hasPendingChanges: Selector<boolean> = createSelector(
  (state) => getPendingChanges()(state) !== 0
)

export const hasUndoActions: Selector<boolean> = createSelector(
  (state) => state.history.undoStack.length > 0
)

export const hasRedoActions: Selector<boolean> = createSelector(
  (state) => state.history.redoStack.length > 0
)

export const getUndoStack: Selector<ReversibleAction[][]> = createSelector(
  (state) => state.history.undoStack
)
export const getRedoStack: Selector<ReversibleAction[][]> = createSelector(
  (state) => state.history.redoStack
)
