import { PrivacyWrapper } from '@/components/content/privacy-wrapper'
import { ExternalProvider } from '@/helper/use-consent'
import {
  GeogebraRenderer,
  parseId,
} from '@/serlo-editor/plugins/geogebra/renderer'
import { EditorGeogebraPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export interface GeogebraProps {
  id: string
}

//TODO: move PrivacyWrapper to frontend

export function GeogebraStaticRenderer({ state: id }: EditorGeogebraPlugin) {
  const { url } = parseId(id)
  return (
    <>
      <PrivacyWrapper
        type="applet"
        provider={ExternalProvider.GeoGebra}
        embedUrl={url}
        className="print:hidden"
      >
        <GeogebraRenderer url={url} id={id} />
      </PrivacyWrapper>
      <p className="serlo-p hidden print:block">[{url}]</p>
    </>
  )
}
