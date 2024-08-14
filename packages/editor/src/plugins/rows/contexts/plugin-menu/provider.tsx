import { type ReactNode, useReducer } from 'react'

import { PluginMenuContext } from './context'
import { pluginMenuReducer } from './reducer'
import { pluginMenuInitialState } from './state'

interface PluginMenuProviderProps {
  children: ReactNode
  allowedChildPlugins: string[] | undefined
}

export const PluginMenuProvider = (props: PluginMenuProviderProps) => {
  const { children, allowedChildPlugins } = props

  const [initialState, pluginMenuDispatch] = useReducer(
    pluginMenuReducer,
    pluginMenuInitialState
  )

  const pluginMenuState = {
    ...initialState,
    allowedChildPlugins,
  }

  return (
    <PluginMenuContext.Provider value={{ pluginMenuState, pluginMenuDispatch }}>
      {children}
    </PluginMenuContext.Provider>
  )
}
