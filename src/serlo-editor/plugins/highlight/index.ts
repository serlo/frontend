import { HighlightEditor } from './editor'
import { HighlightRenderer, HighlightRendererProps } from './renderer'
import {
  boolean,
  BooleanStateType,
  EditorPlugin,
  EditorPluginProps,
  object,
  ObjectStateType,
  string,
  StringStateType,
} from '@/serlo-editor/plugin'

export function createHighlightPlugin(
  config: HighlightConfig = {}
): EditorPlugin<HighlightPluginState, HighlightPluginConfig> {
  const { Renderer = HighlightRenderer } = config

  return {
    Component: HighlightEditor,
    config: {
      Renderer,
    },
    state: object({
      code: string(''),
      language: string('text'),
      showLineNumbers: boolean(false),
    }),
  }
}

export interface HighlightConfig {
  Renderer?: HighlightPluginConfig['Renderer']
}

export type HighlightPluginState = ObjectStateType<{
  code: StringStateType
  language: StringStateType
  showLineNumbers: BooleanStateType
}>

export interface HighlightPluginConfig {
  Renderer: React.ComponentType<HighlightRendererProps>
}

export type HighlightProps = EditorPluginProps<
  HighlightPluginState,
  HighlightPluginConfig
>
