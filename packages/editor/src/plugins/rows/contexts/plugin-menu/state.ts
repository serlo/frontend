import { PluginMenuState } from './types'

export const pluginMenuInitialState: PluginMenuState = {
  allowedChildPlugins: undefined,
  showPluginMenu: false,
  insertIndex: undefined,
  insertCallback: undefined,
  searchInputRef: null,
}
