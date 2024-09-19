import { EditorPlugin } from '../internal-plugin'

export interface PluginWithData {
  type: string
  plugin: EditorPlugin | EditorPlugin<any, any>
  visibleInSuggestions?: boolean
  icon?: JSX.Element
}

export type PluginsWithData = PluginWithData[]

export const editorPlugins = (function () {
  let allPlugins: PluginsWithData | null = null

  function init(plugins: PluginsWithData) {
    if (allPlugins) return // only initialize once

    allPlugins = plugins

    // Ensure the highest integrity level that JS provides
    Object.freeze(allPlugins)
  }

  function getAllWithData() {
    if (!allPlugins) throw new Error('init editor plugins first')

    return allPlugins
  }

  function getByType(pluginType: string) {
    const plugins = getAllWithData()

    const contextPlugin =
      plugins.find((plugin) => plugin.type === pluginType) ??
      plugins.find((plugin) => plugin.type === 'unsupported')

    return (contextPlugin?.plugin as EditorPlugin) ?? null
  }

  function isSupported(pluginType: string) {
    const plugins = getAllWithData()

    return !!plugins.find((plugin) => plugin.type === pluginType)
  }

  return { init, getAllWithData, getByType, isSupported }
})()
