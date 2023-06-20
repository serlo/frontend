import { LicenseNotice } from './license/license-notice'
import { PrivacyWrapper } from './privacy-wrapper'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData } from '@/data-types'
import { ExternalProvider } from '@/helper/use-consent'
import {
  parseVideoUrl,
  VideoRenderer,
} from '@/serlo-editor/plugins/video/renderer'

export interface VideoProps {
  src: string
  license?: LicenseData
}

export function Video({ src, license }: VideoProps) {
  const { lang } = useInstanceData()

  const [iframeSrc, type] = parseVideoUrl(src, lang)

  if (!type) return <VideoRenderer src="" /> // error message

  return (
    <>
      <PrivacyWrapper
        type="video"
        provider={type as unknown as ExternalProvider}
        embedUrl={iframeSrc}
        className="print:hidden"
      >
        <VideoRenderer src={iframeSrc} type={type} />
      </PrivacyWrapper>
      {license && !license.isDefault && (
        <p className="serlo-p">
          <LicenseNotice minimal data={license} type="video" />
        </p>
      )}
      <p className="serlo-p hidden print:block">[{src}]</p>
    </>
  )
}
