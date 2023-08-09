import { GeogebraEditor } from './editor'
import { type EditorPlugin, type EditorPluginProps, string } from '../../plugin'

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
