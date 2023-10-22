import {
  GeogebraRenderer,
  parseId,
} from '@/serlo-editor/plugins/geogebra/renderer'
import { EditorGeogebraDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function GeogebraStaticRenderer({ state: id }: EditorGeogebraDocument) {
  const { url } = parseId(id)
  return <GeogebraRenderer url={url} id={id} />
}
