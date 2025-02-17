import { createSelector } from '@reduxjs/toolkit'
import * as R from 'ramda'

import { selectChildTree } from '../documents'
import { State } from '../types'

const selectSelf = (state: State) => state.focus

export const selectIsFocused = createSelector(
  [selectSelf, (_state, id: string) => id],
  (focus, id: string) => focus === id
)

export const selectHasFocusedChild = createSelector(
  [(state: State) => state, (_state, id: string) => id],
  (state, id: string) => {
    const tree = selectChildTree(state, id)
    if (!tree || !tree.children) return false
    return R.any((node) => node.id === state.focus, tree.children)
  }
)
