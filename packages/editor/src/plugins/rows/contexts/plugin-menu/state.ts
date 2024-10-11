import { ROOT } from '@editor/store/root/constants'

import { PluginMenuState } from './types'

export const pluginMenuInitialState: PluginMenuState = {
  allowedChildPlugins: undefined,
  showPluginMenu: false,
  insertIndex: undefined,
  insertCallback: undefined,
  parentPluginId: ROOT,
}
