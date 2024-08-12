import { type ReactNode, useReducer, useRef } from 'react'

import { PluginMenuContext } from './context'
import { pluginMenuReducer } from './reducer'
import { pluginMenuInitialState } from './state'

interface PluginMenuProviderProps {
  children: ReactNode
  allowedChildPlugins: string[] | undefined
}

export const PluginMenuProvider = (props: PluginMenuProviderProps) => {
  const { children, allowedChildPlugins } = props

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [initialState, pluginMenuDispatch] = useReducer(
    pluginMenuReducer,
    pluginMenuInitialState
  )

  const pluginMenuState = {
    ...initialState,
    searchInputRef,
    allowedChildPlugins,
  }

  return (
    <PluginMenuContext.Provider value={{ pluginMenuState, pluginMenuDispatch }}>
      {children}
    </PluginMenuContext.Provider>
  )
}
