import { PayloadAction } from '@reduxjs/toolkit'

import type { DocumentState } from '../types'

export type InsertAndFocusDocumentAction = PayloadAction<
  { id: string } & DocumentState
>

export type PureInsertDocumentAction = PayloadAction<
  { id: string } & DocumentState
>

export type PureRemoveDocumentAction = PayloadAction<string>

export type PureChangeDocumentAction = PayloadAction<{
  id: string
  state: unknown
}>

export type PureReplaceDocumentAction = PayloadAction<{
  id: string
  plugin: string
  state?: unknown
}>

export interface ChildTreeNode {
  id: string
  children?: Array<ChildTreeNode>
}
