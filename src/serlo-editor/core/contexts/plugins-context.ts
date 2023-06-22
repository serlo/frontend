import { createContext, useContext } from 'react'

import { EditorPlugin } from '@/serlo-editor/types/internal__plugin'

export const PluginsContext = createContext<PluginsContextPlugins>([])

export function usePlugins() {
  return useContext(PluginsContext)
}

export function usePlugin(type?: string) {
  const plugins = useContext(PluginsContext)
  return getPluginByType(plugins, type)
}

export function getPluginByType(plugins: PluginsContextPlugins, type?: string) {
  return plugins.find(({ type: pluginType }) => pluginType === type)
}

export interface PluginsContextPlugin {
  type: string
  plugin: EditorPlugin | EditorPlugin<any, any>
  visible?: boolean // in plugin suggestions
  icon?: JSX.Element
}

export type PluginsContextPlugins = PluginsContextPlugin[]
