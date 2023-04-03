import * as InternalPluginToolbar from '../../internal__plugin-toolbar'
import * as React from 'react'

import { PluginToolbarContext } from '../contexts'

/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlayCheckbox}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlayCheckboxProps}
 * @public
 */
export function OverlayCheckbox(props: OverlayCheckboxProps) {
  const { OverlayCheckbox } = React.useContext(PluginToolbarContext)
  return <OverlayCheckbox {...props} />
}
/** @public */
export type OverlayCheckboxProps = InternalPluginToolbar.OverlayCheckboxProps
