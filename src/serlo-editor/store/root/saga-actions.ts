import { createAction } from '@reduxjs/toolkit'

export const runInitRootSaga = createAction<{
  initialState: {
    plugin: string
    state?: unknown
  }
}>('root/runInitRootSaga')
