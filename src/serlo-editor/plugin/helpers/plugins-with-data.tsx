import { EditorPlugin } from '../internal-plugin'

interface PluginWithData {
  type: string
  plugin: EditorPlugin | EditorPlugin<any, any>
  visibleInSuggestions?: boolean
  icon?: JSX.Element
}

export type PluginsWithData = PluginWithData[]

export const pluginsWithData = (function () {
  let EditorContextPlugins: PluginsWithData | null = null

  function init(plugins: PluginsWithData) {
    if (EditorContextPlugins) return // only initialize once

    EditorContextPlugins = plugins

    // Ensure the highest integrity level that JS provides
    Object.freeze(EditorContextPlugins)
  }

  function getAllPlugins() {
    if (!EditorContextPlugins) throw new Error('No Editor Plugins provided!')

    return EditorContextPlugins
  }

  function getPluginByType(pluginType: string) {
    const plugins = getAllPlugins()

    const contextPlugin =
      plugins.find((plugin) => plugin.type === pluginType) ??
      plugins.find((plugin) => plugin.type === 'unsupported')

    return (contextPlugin?.plugin as EditorPlugin) ?? null
  }

  return { init, getAllPlugins, getPluginByType }
})()
