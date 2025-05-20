import {
  type EditorPlugin,
  type EditorPluginProps,
  boolean,
  object,
  string,
} from '@editor/plugin'

import { HighlightEditor } from './editor'

const hightlightState = object({
  code: string(''),
  language: string('text'),
  showLineNumbers: boolean(false),
})

export type HighlightPluginState = typeof hightlightState

export type HighlightProps = EditorPluginProps<HighlightPluginState>

export const highlightPlugin: EditorPlugin<HighlightPluginState> = {
  Component: HighlightEditor,
  state: hightlightState,
}
