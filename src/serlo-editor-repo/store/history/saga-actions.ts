import { createAction } from '@reduxjs/toolkit'

import type { ReversibleAction } from '..'
import { StateExecutor } from '../../internal__plugin-state'

export const commit = createAction<ReversibleAction[]>('history/commit')

export const temporaryCommit = createAction<{
  initial: ReversibleAction[]
  executor?: StateExecutor<ReversibleAction[]>
}>('history/temporaryCommit')
