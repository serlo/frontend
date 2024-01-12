import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { RootWithOptionalsEditor } from './editor'

const state = object({
  // Content is mandatory, everything else needs to be optional
  content: child({ plugin: EditorPluginType.Rows }),
})

export type RootWithOptionalsState = typeof state
export type RootWithOptionalsProps = EditorPluginProps<RootWithOptionalsState>

export const rootWithOptionalsPlugin: EditorPlugin<RootWithOptionalsState> = {
  Component: RootWithOptionalsEditor,
  state: state,
  config: {},
}
