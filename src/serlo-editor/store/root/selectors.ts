import { createSelector } from '@reduxjs/toolkit'

import { selectSerializedDocument } from '../documents'
import { State } from '../types'

const selectSelf = (state: State) => state.root

export const selectRoot = createSelector(selectSelf, (root) => root)

export const selectSerializedRootDocument = createSelector(
  (state: State) => state,
  (state) => {
    if (!state.root) return null
    return selectSerializedDocument(state, state.root)
  }
)
