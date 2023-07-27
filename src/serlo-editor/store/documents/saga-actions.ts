import { createAction } from '@reduxjs/toolkit'

import { StateExecutor, StateUpdater } from '../../types/internal__plugin-state'
import { PluginsContextPlugins } from '@/serlo-editor/core/contexts/plugins-context'

export const runChangeDocumentSaga = createAction<{
  id: string
  plugins: PluginsContextPlugins
  state: {
    initial: StateUpdater<unknown>
    executor?: StateExecutor<StateUpdater<unknown>>
  }
  reverse?: (previousState: unknown) => unknown
}>('documents/runChangeDocumentSaga')

export const runReplaceDocumentSaga = createAction<{
  id: string
  plugins: PluginsContextPlugins
  pluginType: string
  state?: unknown
}>('documents/runReplaceDocumentSaga')
