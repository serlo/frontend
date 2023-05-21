import { PayloadAction } from '@reduxjs/toolkit'

import type { ReversibleAction, State } from '../types'

export type PersistAction = PayloadAction<State['documents']>

export type PureCommitAction = PayloadAction<{
  combine: boolean
  actions: ReversibleAction[]
}>
