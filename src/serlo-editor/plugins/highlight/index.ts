import {
  boolean,
  BooleanStateType,
  EditorPlugin,
  EditorPluginProps,
  object,
  ObjectStateType,
  string,
  StringStateType,
} from '../../plugin'
import { DeepPartial } from '../../ui'
import { HighlightEditor } from './editor'
import type { HighlightRendererProps } from './renderer'

/**
 * @param config - {@link HighlightConfig | Plugin configuration}
 */
export function createHighlightPlugin(
  config: HighlightConfig = {}
): EditorPlugin<HighlightPluginState, HighlightConfig> {
  return {
    Component: HighlightEditor,
    config,
    state: object({
      code: string(''),
      language: string('text'),
      showLineNumbers: boolean(false),
    }),
  }
}

export interface HighlightConfig {
  Renderer?: HighlightPluginConfig['Renderer']
  i18n?: DeepPartial<HighlightPluginConfig['i18n']>
}

export type HighlightPluginState = ObjectStateType<{
  code: StringStateType
  language: StringStateType
  showLineNumbers: BooleanStateType
}>

export interface HighlightPluginConfig {
  Renderer: React.ComponentType<HighlightRendererProps>
  i18n: {
    code: {
      label: string
      placeholder: string
    }
    language: {
      label: string
      placeholder: string
    }
    showLineNumbers: {
      label: string
    }
  }
}
export { HighlightRendererProps }

export type HighlightProps = EditorPluginProps<
  HighlightPluginState,
  HighlightConfig
>
