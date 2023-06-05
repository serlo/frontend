import { createSelector } from '@reduxjs/toolkit'

import { State } from '../types'

const selectSelf = (state: State) => state.history

export const selectPendingChanges = createSelector(
  selectSelf,
  (history) => history.pendingChanges
)

export const selectHasPendingChanges = createSelector(
  selectSelf,
  (history) => history.pendingChanges !== 0
)

export const selectHasUndoActions = createSelector(
  selectSelf,
  (history) => history.undoStack.length > 0
)

export const selectHasRedoActions = createSelector(
  selectSelf,
  (history) => history.redoStack.length > 0
)

export const selectUndoStack = createSelector(
  selectSelf,
  (history) => history.undoStack
)
export const selectRedoStack = createSelector(
  selectSelf,
  (history) => history.redoStack
)
