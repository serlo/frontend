import {
  EditorPlugin,
  EditorPluginProps,
  string,
  StringStateType,
} from '../../plugin'
import { GeogebraEditor } from './editor'

export function createGeogebraPlugin(): EditorPlugin<GeogebraPluginState> {
  return {
    Component: GeogebraEditor,
    state: string(),
    config: {},
    onText(value) {
      if (/geogebra\.org\/m\/(.+)/.test(value)) {
        return { state: value }
      }
    },
  }
}

export type GeogebraPluginState = StringStateType

export type GeogebraProps = EditorPluginProps<GeogebraPluginState>
