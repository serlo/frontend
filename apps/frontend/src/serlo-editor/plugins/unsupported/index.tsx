import { UnsupportedEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  scalar,
  string,
} from '@/serlo-editor/plugin'

const unsupportedState = object({
  plugin: string(),
  state: scalar<unknown>({}),
})

export const unsupportedPlugin: EditorPlugin<typeof unsupportedState> = {
  Component: UnsupportedEditor,
  state: unsupportedState,
  config: {},
}

export type UnsupportedPluginState = typeof unsupportedState
export type UnsupportedPluginProps = EditorPluginProps<UnsupportedPluginState>
