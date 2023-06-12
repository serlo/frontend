import {
  EditorPlugin,
  EditorPluginProps,
  string,
  StringStateType,
} from '../../../plugin'
import { SerloInjectionEditor } from './editor'

/**
 * @param config - {@link SerloInjectionConfig | Plugin configuration}
 */

// this plugin is currently only used in the edusharing integration
// https://github.com/serlo/serlo-editor-for-edusharing
// TODO: move to edusharing integration

export function createSerloInjectionPlugin(
  config: SerloInjectionConfig = {}
): EditorPlugin<SerloInjectionPluginState, SerloInjectionConfig> {
  return {
    Component: SerloInjectionEditor,
    config,
    state: string(),
  }
}

export interface SerloInjectionConfig {
  i18n?: Partial<SerloInjectionPluginConfig['i18n']>
}

export type SerloInjectionPluginState = StringStateType

export interface SerloInjectionPluginConfig {
  i18n: {
    label: string
    placeholder: string
  }
}

export type SerloInjectionProps = EditorPluginProps<
  SerloInjectionPluginState,
  SerloInjectionConfig
>
