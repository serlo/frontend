import * as InternalPluginToolbar from '../../internal__plugin-toolbar'
import * as React from 'react'

import { PluginToolbarContext } from '../contexts'

/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | PluginToolbarButton}
 *
 * @public
 */
export const PluginToolbarButton = React.forwardRef<
  HTMLButtonElement,
  PluginToolbarButtonProps
>(function PluginToolbarButton(props, ref) {
  const { PluginToolbarButton } = React.useContext(PluginToolbarContext)
  return <PluginToolbarButton {...props} ref={ref} />
})
/** @public */
export type PluginToolbarButtonProps =
  InternalPluginToolbar.PluginToolbarButtonProps
