import { createContext } from 'react'

import * as InternalPluginToolbar from '../../types/internal__plugin-toolbar'

export const PluginToolbarContext = createContext<PluginToolbar>(
  undefined as unknown as PluginToolbar
)
export type PluginToolbar = InternalPluginToolbar.PluginToolbar
