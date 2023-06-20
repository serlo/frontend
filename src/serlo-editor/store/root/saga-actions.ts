import { createAction } from '@reduxjs/toolkit'

import { PluginsContextPlugins } from '@/serlo-editor/core/contexts/plugins-context'

export const runInitRootSaga = createAction<{
  initialState: {
    plugin: string
    state?: unknown
  }
  plugins: PluginsContextPlugins
}>('root/runInitRootSaga')
