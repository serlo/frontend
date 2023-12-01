import dynamic from 'next/dynamic'

import { EditorGeogebraDocument } from '../../serlo-editor/types/editor-plugins'
import { Lazy } from '@/components/content/lazy'
import type { PrivacyWrapperProps } from '@/components/content/privacy-wrapper'
import { ExternalProvider } from '@/helper/use-consent'
import { parseId } from '@/serlo-editor/plugins/geogebra/renderer'
import { GeogebraStaticRenderer } from '@/serlo-editor/plugins/geogebra/static'

const PrivacyWrapper = dynamic<PrivacyWrapperProps>(() =>
  import('@/components/content/privacy-wrapper').then(
    (mod) => mod.PrivacyWrapper
  )
)

export function GeogebraSerloStaticRenderer(props: EditorGeogebraDocument) {
  if (!props.state) return null
  const { url } = parseId(props.state)
  return (
    <Lazy noPrint>
      <PrivacyWrapper
        type="applet"
        provider={ExternalProvider.GeoGebra}
        embedUrl={url}
        className="print:hidden"
      >
        <GeogebraStaticRenderer {...props} />
      </PrivacyWrapper>
      <p className="serlo-p hidden print:block">[{url}]</p>
    </Lazy>
  )
}
