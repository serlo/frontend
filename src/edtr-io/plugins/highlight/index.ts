import { mergeDeepRight } from 'ramda'

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
import { DeepPartial } from '@/serlo-editor/ui'

/**
 * @param config - {@link HighlightConfig | Plugin configuration}
 */
export function createHighlightPlugin(
  config: HighlightConfig = {}
): EditorPlugin<HighlightPluginState, HighlightPluginConfig> {
  const { i18n = {}, Renderer = HighlightRenderer } = config

  return {
    Component: HighlightEditor,
    config: {
      i18n: mergeDeepRight(
        {
          code: {
            label: 'Click here and enter your source code…',
            placeholder: 'Enter your source code here',
          },
          language: {
            label: 'Language',
            placeholder: 'Enter language',
          },
          showLineNumbers: {
            label: 'Show line numbers',
          },
        },
        i18n
      ),
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

export type HighlightProps = EditorPluginProps<
  HighlightPluginState,
  HighlightPluginConfig
>
