import {
  InteractiveVideoStaticRenderer,
  parseVideoUrl,
  type EditorInteractiveVideoDocument,
  type EditorVideoDocument,
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

export function InteractiveVideoSerloStaticRenderer(
  props: EditorInteractiveVideoDocument
) {
  const videoDocument = props.state.video as EditorVideoDocument
  const { src } = videoDocument.state

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
        <InteractiveVideoStaticRenderer {...props} />
      </PrivacyWrapper>
      <p className="serlo-p hidden print:block">[{src}]</p>
    </Lazy>
  )
}
