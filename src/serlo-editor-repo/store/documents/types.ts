import { PayloadAction } from '@reduxjs/toolkit'

import type { DocumentState } from '../types'

export type PureInsertAction = PayloadAction<{ id: string } & DocumentState>

export type PureRemoveAction = PayloadAction<string>

export type PureChangeAction = PayloadAction<{
  id: string
  state: unknown
}>

export type PureReplaceAction = PayloadAction<{
  id: string
  plugin: string
  state?: unknown
}>
