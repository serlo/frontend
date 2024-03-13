import { parseVideoUrl } from '@editor/plugins/video/renderer'
import { VideoStaticRenderer } from '@editor/plugins/video/static'
import { EditorVideoDocument } from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'

import { Lazy } from '@/components/content/lazy'
import type { PrivacyWrapperProps } from '@/components/content/privacy-wrapper'
import { ExternalProvider } from '@/helper/use-consent'

const PrivacyWrapper = dynamic<PrivacyWrapperProps>(() =>
  import('@/components/content/privacy-wrapper').then(
    (mod) => mod.PrivacyWrapper
  )
)

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
