import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { SpoilerEditor } from './editor'
import {
  child,
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  optional,
} from '../../plugin'

const spoilerState = object({
  title: optional(string('')),
  richTitle: optional(
    child({
      plugin: EditorPluginType.Text,
      config: { noLinebreaks: true },
    })
  ),
  content: child({ plugin: EditorPluginType.Rows }),
})

export const spoilerPlugin: EditorPlugin<SpoilerPluginState> = {
  Component: SpoilerEditor,
  state: spoilerState,
}

export type SpoilerPluginState = typeof spoilerState
export type SpoilerProps = EditorPluginProps<SpoilerPluginState>
