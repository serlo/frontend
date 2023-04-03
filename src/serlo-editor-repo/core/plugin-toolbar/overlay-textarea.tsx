import * as InternalPluginToolbar from '../../internal__plugin-toolbar'
import * as React from 'react'

import { PluginToolbarContext } from '../contexts'

/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlayTextarea}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlayTextareaProps}
 * @public
 */
export function OverlayTextarea(props: OverlayTextareaProps) {
  const { OverlayTextarea } = React.useContext(PluginToolbarContext)
  return <OverlayTextarea {...props} />
}
/** @public */
export type OverlayTextareaProps = InternalPluginToolbar.OverlayTextareaProps
