import {
  type EditorVideoDocument,
  parseVideoUrl,
  VideoType,
  VideoStaticRenderer,
} from '@editor/package'
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

  if (type === VideoType.SerloAsset) {
    return (
      <Lazy noPrint>
        <>
          <VideoStaticRenderer {...props} />
          <p className="serlo-p hidden print:block">[{src}]</p>
        </>
      </Lazy>
    )
  }

  return (
    <Lazy noPrint>
      <>
        <PrivacyWrapper
          type="video"
          provider={type as unknown as ExternalProvider}
          embedUrl={iframeSrc}
          className="print:hidden"
        >
          <VideoStaticRenderer {...props} />
        </PrivacyWrapper>
        <p className="serlo-p hidden print:block">[{src}]</p>
      </>
    </Lazy>
  )
}
