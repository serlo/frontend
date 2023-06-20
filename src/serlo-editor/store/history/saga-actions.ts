import { createAction } from '@reduxjs/toolkit'

import type { ReversibleAction } from '..'
import { StateExecutor } from '../../types/internal__plugin-state'

export const runCommitActionToHistorySaga = createAction<ReversibleAction[]>(
  'history/commitActionToHistory'
)

export const runCommitTemporaryActionToHistorySaga = createAction<{
  initial: ReversibleAction[]
  executor?: StateExecutor<ReversibleAction[]>
}>('history/commitTemporaryActionToHistory')
