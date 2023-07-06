import { PayloadAction } from '@reduxjs/toolkit'

import type { ReversibleAction, State } from '../types'

export type PersistHistoryAction = PayloadAction<State['documents']>

export type PureCommitActionToHistoryAction = PayloadAction<{
  combine: boolean
  actions: ReversibleAction[]
}>
