import { useContext } from 'react'

import * as InternalPluginToolbar from '../../internal__plugin-toolbar'
import { PluginToolbarContext } from '../contexts'

/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlayTextarea}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlayTextareaProps}
 */
export function OverlayTextarea(props: OverlayTextareaProps) {
  const { OverlayTextarea } = useContext(PluginToolbarContext)
  return <OverlayTextarea {...props} />
}
export type OverlayTextareaProps = InternalPluginToolbar.OverlayTextareaProps
