import { createAction } from '@reduxjs/toolkit'

import { StateExecutor, StateUpdater } from '../../types/internal__plugin-state'

export const runChangeDocumentSaga = createAction<{
  id: string
  state: {
    initial: StateUpdater<unknown>
    executor?: StateExecutor<StateUpdater<unknown>>
  }
  reverse?: (previousState: unknown) => unknown
}>('documents/runChangeDocumentSaga')

export const runReplaceDocumentSaga = createAction<{
  id: string
  pluginType: string
  state?: unknown
}>('documents/runReplaceDocumentSaga')
