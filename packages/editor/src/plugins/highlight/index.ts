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

export function createHighlightPlugin(): EditorPlugin<HighlightPluginState> {
  return {
    Component: HighlightEditor,
    state: hightlightState,
  }
}
