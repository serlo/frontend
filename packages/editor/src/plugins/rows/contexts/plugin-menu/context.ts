import { createContext, type Dispatch } from 'react'

import { pluginMenuInitialState } from './state'
import type { PluginMenuActions, PluginMenuState } from './types'

export const PluginMenuContext = createContext<{
  pluginMenuState: PluginMenuState
  pluginMenuDispatch: Dispatch<PluginMenuActions>
}>({
  pluginMenuState: pluginMenuInitialState,
  pluginMenuDispatch: () => null,
})
