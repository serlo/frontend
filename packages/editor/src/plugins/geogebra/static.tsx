import { GeogebraRenderer, parseId } from '@editor/plugins/geogebra/renderer'
import { EditorGeogebraDocument } from '@editor/types/editor-plugins'

export function GeogebraStaticRenderer({ state: id }: EditorGeogebraDocument) {
  const { cleanId } = parseId(id)
  return <GeogebraRenderer geogebraId={cleanId} />
}
