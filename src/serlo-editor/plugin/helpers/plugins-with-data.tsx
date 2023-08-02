import { EditorPlugin } from '../internal-plugin'

interface PluginWithData {
  type: string
  plugin: EditorPlugin | EditorPlugin<any, any>
  visible?: boolean // in plugin suggestions
  icon?: JSX.Element
}

export type PluginsWithData = PluginWithData[]

export const pluginsData = (function () {
  let EditorContextPlugins: PluginsWithData | null = null

  function init(plugins: PluginsWithData) {
    if (EditorContextPlugins) return // only initialize once

    EditorContextPlugins = plugins

    // Ensure the highest integrity level that JS provides
    Object.freeze(EditorContextPlugins)
  }

  function getAll() {
    if (!EditorContextPlugins) throw new Error('No Editor Plugins provided!')

    return EditorContextPlugins
  }

  function getOne(pluginType: string) {
    const plugins = getAll()

    const contextPlugin =
      plugins.find((plugin) => plugin.type === pluginType) ??
      plugins.find((plugin) => plugin.type === 'unsupported')

    return (contextPlugin?.plugin as EditorPlugin) ?? null
  }

  return { init, getAll, getOne }
})()
