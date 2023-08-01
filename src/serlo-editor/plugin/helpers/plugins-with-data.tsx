import { EditorPlugin } from '../internal-plugin'

interface PluginWithData {
  type: string
  plugin: EditorPlugin | EditorPlugin<any, any>
  visible?: boolean // in plugin suggestions
  icon?: JSX.Element
}

export type PluginsWithData = PluginWithData[]

declare global {
  /** Never change directly! */
  // eslint-disable-next-line no-var
  var EditorContextPlugins: PluginsWithData
}

export function initEditorPlugins(plugins: PluginsWithData) {
  if (globalThis.EditorContextPlugins) return // only initialize once
  globalThis.EditorContextPlugins = plugins
}

export function getPluginsWithData() {
  if (!globalThis.EditorContextPlugins)
    throw new Error('No Editor Plugins provided!')

  return globalThis.EditorContextPlugins
}

export function getEditorPlugin(pluginType: string) {
  const plugins = getPluginsWithData()
  const contextPlugin =
    plugins.find((plugin) => plugin.type === pluginType) ??
    plugins.find((plugin) => plugin.type === 'unsupported')
  return (contextPlugin?.plugin as EditorPlugin) ?? null
}
