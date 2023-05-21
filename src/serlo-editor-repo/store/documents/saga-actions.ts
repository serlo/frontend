import { createAction } from '@reduxjs/toolkit'

import { StateExecutor, StateUpdater } from '../../internal__plugin-state'

export const change = createAction<{
  id: string
  state: {
    initial: StateUpdater<unknown>
    executor?: StateExecutor<StateUpdater<unknown>>
  }
  reverse?: (previousState: unknown) => unknown
}>('documents/change')

export const replace = createAction<{
  id: string
  plugin: string
  state?: unknown
}>('documents/replace')
