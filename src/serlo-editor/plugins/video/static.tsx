import { PrivacyWrapper } from '@/components/content/privacy-wrapper'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData } from '@/data-types'
import { ExternalProvider } from '@/helper/use-consent'
import {
  parseVideoUrl,
  VideoRenderer,
} from '@/serlo-editor/plugins/video/renderer'
import { EditorVideoPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export interface VideoProps {
  src: string
  license?: LicenseData
}

// TODO: move PrivWrapper and re-add license to frontend

export function VideoStaticRenderer({ state: { src } }: EditorVideoPlugin) {
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
      <p className="serlo-p hidden print:block">[{src}]</p>
    </>
  )
}
