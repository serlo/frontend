import {
  AudioRenderer,
  getVocarooUrl,
  parseAudioUrl,
} from '@editor/plugins/audio/renderer'
import { EditorAudioDocument } from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'

import { Lazy } from '@/components/content/lazy'
import type { PrivacyWrapperProps } from '@/components/content/privacy-wrapper'
import { ExternalProvider } from '@/helper/use-consent'

const PrivacyWrapper = dynamic<PrivacyWrapperProps>(() =>
  import('@/components/content/privacy-wrapper').then(
    (mod) => mod.PrivacyWrapper
  )
)

export function AudioSerloStaticRenderer(props: EditorAudioDocument) {
  const [src, type] = parseAudioUrl(props.state.src)
  const vocarooUrl = getVocarooUrl(src)

  return (
    <Lazy noPrint>
      <PrivacyWrapper
        type="audio"
        provider={ExternalProvider.Vocaroo}
        embedUrl={vocarooUrl}
        className="print:hidden"
      >
        <AudioRenderer src={src} type={type} />
      </PrivacyWrapper>
      <p className="serlo-p hidden print:block">[{vocarooUrl}]</p>
    </Lazy>
  )
}
