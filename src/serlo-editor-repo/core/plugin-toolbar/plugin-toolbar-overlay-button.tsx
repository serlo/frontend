import { useContext } from 'react'

import * as InternalPluginToolbar from '../../internal__plugin-toolbar'
import { PluginToolbarContext } from '../contexts'

/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | PluginToolbarOverlayButton}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#PluginToolbarOverlayButtonProps}
 * @public
 */
export function PluginToolbarOverlayButton(
  props: PluginToolbarOverlayButtonProps
) {
  const { PluginToolbarOverlayButton } = useContext(PluginToolbarContext)
  return <PluginToolbarOverlayButton {...props} />
}
/** @public */
export type PluginToolbarOverlayButtonProps =
  InternalPluginToolbar.PluginToolbarOverlayButtonProps
