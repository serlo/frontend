import { createContext } from 'react'

import * as InternalPluginToolbar from '../../internal__plugin-toolbar'

/** @public */
export const PluginToolbarContext = createContext<PluginToolbar>(
  undefined as unknown as PluginToolbar
)
/** @public */
export type PluginToolbar = InternalPluginToolbar.PluginToolbar
