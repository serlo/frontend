import {
  EditorPlugin,
  EditorPluginProps,
  string,
  StringStateType,
} from '../plugin'
import { GeogebraEditor } from './editor'

/**
 * @param config - {@link GeogebraConfig | Plugin configuration}
 */
export function createGeogebraPlugin(
  config: GeogebraConfig = {}
): EditorPlugin<GeogebraPluginState, GeogebraConfig> {
  return {
    Component: GeogebraEditor,
    config,
    state: string(),
    onText(value) {
      if (/geogebra\.org\/m\/(.+)/.test(value)) {
        return { state: value }
      }
    },
  }
}

export interface GeogebraConfig {
  i18n?: Partial<GeogebraPluginConfig['i18n']>
}

export type GeogebraPluginState = StringStateType

export interface GeogebraPluginConfig {
  i18n: {
    label: string
    placeholder: string
  }
}

export type GeogebraProps = EditorPluginProps<
  GeogebraPluginState,
  GeogebraConfig
>
