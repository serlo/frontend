import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { BoxEditor } from './editor'

const boxState = object({
  type: string(''),
  title: child({
    plugin: EditorPluginType.Text,
    config: { noLinebreaks: true },
  }),
  // we don't generate new id's any more but keep the old ones for now
  anchorId: string(''),
  content: child({ plugin: EditorPluginType.Rows }),
})

export type BoxPluginState = typeof boxState
export type BoxProps = EditorPluginProps<BoxPluginState>

export const boxPlugin: EditorPlugin<BoxPluginState> = {
  Component: BoxEditor,
  state: boxState,
}
