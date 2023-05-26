import { createSelector } from '@reduxjs/toolkit'

import { EditorPlugin } from '../../internal__plugin'
import { State } from '../types'

const selectSelf = (state: State) => state.plugins

export const selectPlugins = createSelector(selectSelf, (plugins) => plugins)

export const selectPlugin = createSelector(
  [selectSelf, (_state, type: string) => type],
  (plugins, type): EditorPlugin | null => {
    return plugins[type] || null
  }
)
