import { LayoutRenderer } from './editor'
import {
  EditorPlugin,
  child,
  list,
  number,
  object,
  EditorPluginProps,
} from '@/serlo-editor/plugin'

const layoutState = list(
  object({ child: child({ plugin: 'text' }), width: number() })
)

export type LayoutPluginState = typeof layoutState
export type LayoutPluginProps = EditorPluginProps<LayoutPluginState>

export const layoutPlugin: EditorPlugin<LayoutPluginState> = {
  Component: LayoutRenderer,
  state: layoutState,
  config: {},
}
