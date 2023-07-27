import { LayoutRenderer } from './editor'
import {
  EditorPlugin,
  child,
  list,
  number,
  object,
  EditorPluginProps,
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const layoutState = list(
  object({ child: child({ plugin: EditorPluginType.Text }), width: number() })
)

export type LayoutPluginState = typeof layoutState
export type LayoutPluginProps = EditorPluginProps<LayoutPluginState>

export const layoutPlugin: EditorPlugin<LayoutPluginState> = {
  Component: LayoutRenderer,
  state: layoutState,
  config: {},
}
