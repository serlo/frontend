import { EditorVideoDocument } from '../types/editor-plugins'
import { Lazy } from '@/components/content/lazy'
import { PrivacyWrapper } from '@/components/content/privacy-wrapper'
import { ExternalProvider } from '@/helper/use-consent'
import { parseVideoUrl } from '@/serlo-editor/plugins/video/renderer'
import { VideoStaticRenderer } from '@/serlo-editor/plugins/video/static'

export function VideoSerloStaticRenderer(props: EditorVideoDocument) {
  const { src } = props.state
  if (!src) return null
  const [iframeSrc, type] = parseVideoUrl(src)
  return (
    <Lazy noPrint>
      <PrivacyWrapper
        type="video"
        provider={type as unknown as ExternalProvider}
        embedUrl={iframeSrc}
        className="print:hidden"
      >
        <VideoStaticRenderer {...props} />
      </PrivacyWrapper>
      <p className="serlo-p hidden print:block">[{src}]</p>
    </Lazy>
  )
}
