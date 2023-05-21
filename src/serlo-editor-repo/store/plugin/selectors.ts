import { createSelector } from '@reduxjs/toolkit'

import { selectDocument } from '../documents'
import { findParent, selectFocusTree } from '../focus'
import { State } from '../types'

export const selectMayManipulateSiblings = createSelector(
  [(state: State) => state, (_state, node: string) => node],
  (state, node: string) => {
    const root = selectFocusTree(state)
    if (!root) return false
    const parent = findParent(root, node)
    if (!parent) return false
    const parentDocument = selectDocument(state, parent.id)
    return parentDocument?.plugin === 'rows'
  }
)
