import {
  EditorPlugin,
  EditorPluginProps,
  string,
  StringStateType,
} from '../plugin'
import { AnchorEditor } from './editor'

/**
 * @param config - {@link AnchorConfig | Plugin configuration}
 */
export function createAnchorPlugin(
  config: AnchorConfig = {}
): EditorPlugin<AnchorPluginState, AnchorConfig> {
  return {
    Component: AnchorEditor,
    config,
    state: string(),
  }
}

export interface AnchorConfig {
  i18n?: Partial<AnchorPluginConfig['i18n']>
}

export type AnchorPluginState = StringStateType

export interface AnchorPluginConfig {
  i18n: {
    label: string
    placeholder: string
  }
}

export type AnchorProps = EditorPluginProps<AnchorPluginState, AnchorConfig>
