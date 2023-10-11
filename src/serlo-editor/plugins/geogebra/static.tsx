import {
  GeogebraRenderer,
  parseId,
} from '@/serlo-editor/plugins/geogebra/renderer'
import { EditorGeogebraPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function GeogebraStaticRenderer({ state: id }: EditorGeogebraPlugin) {
  const { url } = parseId(id)
  return <GeogebraRenderer url={url} id={id} />
}
