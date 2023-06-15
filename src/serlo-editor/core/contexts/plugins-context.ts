import { createContext, useContext } from 'react'

import { EditorPlugins } from '../editor'

export const PluginsContext = createContext<EditorPlugins>({})

export function usePlugins() {
  return useContext(PluginsContext)
}

export function usePlugin(type?: string) {
  const plugins = useContext(PluginsContext)
  if (!type) return null
  return Object.hasOwn(plugins, type) ? plugins[type] : null
}
