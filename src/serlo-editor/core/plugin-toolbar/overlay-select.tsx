import { useContext } from 'react'

import * as InternalPluginToolbar from '../../types/internal__plugin-toolbar'
import { PluginToolbarContext } from '../contexts'

/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlaySelect}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlaySelectProps}
 */
export function OverlaySelect(props: OverlaySelectProps) {
  const { OverlaySelect } = useContext(PluginToolbarContext)
  return <OverlaySelect {...props} />
}
export type OverlaySelectProps = InternalPluginToolbar.OverlaySelectProps
