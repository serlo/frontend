import { PayloadAction } from '@reduxjs/toolkit'

import type { DocumentState } from '../types'

export type PureInsertActionPayload = PayloadAction<
  { id: string } & DocumentState
>

export type PureRemoveActionPayload = PayloadAction<string>

export type PureChangeActionPayload = PayloadAction<{
  id: string
  state: unknown
}>

export type PureReplaceActionPayload = PayloadAction<{
  id: string
  plugin: string
  state?: unknown
}>

export type PureReplaceTextActionPayload = PayloadAction<{
  id: string
  newId: string
  document: DocumentState
}>
