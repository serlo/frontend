import { PrivacyWrapper } from './privacy-wrapper'
import { ExternalProvider } from '@/helper/use-consent'
import {
  GeogebraRenderer,
  parseId,
} from '@/serlo-editor/plugins/geogebra/renderer'

export interface GeogebraProps {
  id: string
}

export function Geogebra({ id }: GeogebraProps) {
  const { url } = parseId(id)
  return (
    <>
      <PrivacyWrapper
        type="applet"
        provider={ExternalProvider.GeoGebra}
        embedUrl={url}
        className="print:hidden"
      >
        <GeogebraRenderer url={url} />
      </PrivacyWrapper>
      <p className="serlo-p hidden print:block">[{url}]</p>
    </>
  )
}
