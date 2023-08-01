import { EditorPlugin } from '../internal-plugin'

// TODO: ContextPlugin name does not make sense any more, find a naming that explains the difference between an EditorPlugin and a ContextPlugin

export function getContextPlugins() {
  if (!globalThis.EditorContextPlugins) {
    throw new Error('No Editor Plugins provided!')
  }
  return globalThis.EditorContextPlugins
}

export function getPlugin(pluginType: string) {
  const plugins = getContextPlugins()
  const contextPlugin =
    plugins.find((plugin) => plugin.type === pluginType) ??
    plugins.find((plugin) => plugin.type === 'unsupported')
  return (contextPlugin?.plugin as EditorPlugin) ?? null
}

export interface PluginsContextPlugin {
  type: string
  plugin: EditorPlugin | EditorPlugin<any, any>
  visible?: boolean // in plugin suggestions
  icon?: JSX.Element
}

export type PluginsContextPlugins = PluginsContextPlugin[]
