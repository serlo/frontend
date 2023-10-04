import { createSelector } from '@reduxjs/toolkit'
import * as R from 'ramda'

import { selectChildTree } from '../documents'
import { State } from '../types'

const selectSelf = (state: State) => state.focus

export const selectFocused = createSelector(selectSelf, (focus) => focus)

export const selectIsFocused = createSelector(
  [selectSelf, (_state, id: string) => id],
  (focus, id: string) => focus === id
)

export const selectHasFocusedChild = createSelector(
  [(state: State) => state, (_state, id: string) => id],
  (state, id: string) => {
    const tree = selectChildTree(state, id)
    if (!tree || !tree.children) return false
    const focused = selectFocused(state)
    return R.any((node) => node.id === focused, tree.children)
  }
)

export const selectHasFocusedDescendant = createSelector(
  [(state: State) => state, (_state, id: string) => id],
  (state, id: string): boolean => {
    const tree = selectChildTree(state, id)
    if (!tree || !tree.children) return false
    return R.any(
      (node) =>
        selectIsFocused(state, node.id) ||
        selectHasFocusedDescendant(state, node.id),
      tree.children
    )
  }
)
