import { mergeDeepRight } from 'ramda'
import {
  boolean,
  BooleanStateType,
  EditorPlugin,
  EditorPluginProps,
  object,
  ObjectStateType,
  string,
  StringStateType,
} from 'test-edtr-io/plugin'
import { DeepPartial } from 'test-edtr-io/ui'

import { HighlightEditor } from './editor'
import { HighlightRenderer, HighlightRendererProps } from './renderer'

/**
 * @param config - {@link HighlightConfig | Plugin configuration}
 * @public
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

/** @public */
export interface HighlightConfig {
  Renderer?: HighlightPluginConfig['Renderer']
  i18n?: DeepPartial<HighlightPluginConfig['i18n']>
}

/** @public */
export type HighlightPluginState = ObjectStateType<{
  code: StringStateType
  language: StringStateType
  showLineNumbers: BooleanStateType
}>

/** @public */
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

/** @public */
export type HighlightProps = EditorPluginProps<
  HighlightPluginState,
  HighlightPluginConfig
>
