import { LayoutRenderer } from './editor'
import {
  EditorPlugin,
  child,
  list,
  number,
  object,
} from '@/serlo-editor/plugin'

export const layoutState = list(
  object({ child: child({ plugin: 'text' }), width: number() })
)

export type LayoutPluginState = typeof layoutState

export const layoutPlugin: EditorPlugin<LayoutPluginState> = {
  Component: LayoutRenderer,
  state: layoutState,
  config: {},
}
