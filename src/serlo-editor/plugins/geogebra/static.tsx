import {
  GeogebraRenderer,
  parseId,
} from '@/serlo-editor/plugins/geogebra/renderer'
import { EditorGeogebraDocument } from '@/serlo-editor/types/editor-plugins'

export function GeogebraStaticRenderer({ state: id }: EditorGeogebraDocument) {
  const { url, cleanId } = parseId(id)
  return <GeogebraRenderer url={url} id={cleanId} />
}
