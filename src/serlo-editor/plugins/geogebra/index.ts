import { EditorPlugin, EditorPluginProps, string } from '../../plugin'
import { GeogebraEditor } from './editor'

const geogebraState = string()

export type GeogebraPluginState = typeof geogebraState
export type GeogebraProps = EditorPluginProps<GeogebraPluginState>

export const geoGebraPlugin: EditorPlugin<GeogebraPluginState> = {
  Component: GeogebraEditor,
  state: string(),
  config: {},
  onText(value) {
    if (/geogebra\.org\/m\/(.+)/.test(value)) {
      return { state: value }
    }
  },
}
