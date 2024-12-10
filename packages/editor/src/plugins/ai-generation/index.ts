import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
} from '@editor/plugin'

import { AiGenerationEditor } from './editor'

const aiGenerationState = object({})

export type AiGenerationPluginState = typeof aiGenerationState
export type AiGenerationPluginProps = EditorPluginProps<AiGenerationPluginState>

/*
 * Experimental Plugin for generating content with AI
 */
export const aiGenerationPlugin: EditorPlugin<AiGenerationPluginState> = {
  Component: AiGenerationEditor,
  state: aiGenerationState,
  config: {},
}
