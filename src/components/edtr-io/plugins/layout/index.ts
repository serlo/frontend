import { EditorPlugin, child, list, number, object } from '@edtr-io/plugin'

import { LayoutRenderer } from './editor'

export const layoutState = list(
  object({ child: child({ plugin: 'text' }), width: number() })
)

export type LayoutPluginState = typeof layoutState

export const layoutPlugin: EditorPlugin<LayoutPluginState> = {
  Component: LayoutRenderer,
  state: layoutState,
  config: {},
}
