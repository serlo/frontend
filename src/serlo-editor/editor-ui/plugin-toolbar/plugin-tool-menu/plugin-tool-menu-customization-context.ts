// Introduced for edu-sharing integration to hide the `copy anchor link` button in plugin toolbar. Anchor links did not work in edu-sharing because we did not have a entityId there.

import { createContext } from 'react'

export const PluginToolMenuCustomizationContext = createContext<{
  hideAnchorLinkButton: boolean
}>({ hideAnchorLinkButton: false })
