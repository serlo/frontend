import { createSelector } from '@reduxjs/toolkit'

import { State } from '../types'

const selectSelf = (state: State) => state.focus

export const selectFocused = createSelector(selectSelf, (focus) => focus)

export const selectIsFocused = createSelector(
  [selectSelf, (_state, id: string) => id],
  (focus, id: string) => focus === id
)
