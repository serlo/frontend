import { createAction } from '@reduxjs/toolkit'

import { EditorPlugin } from '../../internal__plugin'

export const initRoot = createAction<{
  initialState: {
    plugin: string
    state?: unknown
  }
  plugins: Record<string, EditorPlugin>
}>('root/initRoot')
