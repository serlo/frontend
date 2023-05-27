import { useContext } from 'react'

import * as InternalPluginToolbar from '../../internal__plugin-toolbar'
import { PluginToolbarContext } from '../contexts'

/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlayCheckbox}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlayCheckboxProps}
 */
export function OverlayCheckbox(props: OverlayCheckboxProps) {
  const { OverlayCheckbox } = useContext(PluginToolbarContext)
  return <OverlayCheckbox {...props} />
}
export type OverlayCheckboxProps = InternalPluginToolbar.OverlayCheckboxProps
