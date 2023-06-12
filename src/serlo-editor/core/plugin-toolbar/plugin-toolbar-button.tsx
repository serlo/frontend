import { forwardRef, useContext } from 'react'

import * as InternalPluginToolbar from '../../internal__plugin-toolbar'
import { PluginToolbarContext } from '../contexts'

/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | PluginToolbarButton}
 *
 */
export const PluginToolbarButton = forwardRef<
  HTMLButtonElement,
  PluginToolbarButtonProps
>(function PluginToolbarButton(props, ref) {
  const { PluginToolbarButton } = useContext(PluginToolbarContext)
  return <PluginToolbarButton {...props} ref={ref} />
})
export type PluginToolbarButtonProps =
  InternalPluginToolbar.PluginToolbarButtonProps
