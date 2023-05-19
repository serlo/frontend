import { createAction } from '@reduxjs/toolkit'

import { StateExecutor, StateUpdater } from '../../internal__plugin-state'
import { DocumentState } from '../types'

export const insert = createAction<{
  id: string
  plugin: string
  state?: unknown
}>('documents/insert')

export const remove = createAction<string>('documents/remove')

export const change = createAction<{
  id: string
  state: {
    initial: StateUpdater<unknown>
    executor?: StateExecutor<StateUpdater<unknown>>
  }
  reverse?: (previousState: unknown) => unknown
}>('documents/change')

export const wrap = createAction<{
  id: string
  document: (id: string) => DocumentState
}>('documents/wrap')

export const unwrap = createAction<{
  id: string
  oldId: string
}>('documents/unwrap')

export const replace = createAction<{
  id: string
  plugin: string
  state?: unknown
}>('documents/replace')

export const replaceText = createAction<{
  id: string
  document: (id: string) => DocumentState
}>('documents/replaceText')
