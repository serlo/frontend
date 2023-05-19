import { PayloadAction } from '@reduxjs/toolkit'

import type { ReversibleAction, State } from '../types'

export type PersistActionPayload = PayloadAction<State['documents']>

export type PureCommitActionPayload = PayloadAction<{
  combine: boolean
  actions: ReversibleAction[]
}>
