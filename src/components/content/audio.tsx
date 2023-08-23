import { LicenseData } from '@/data-types'
import {
  parseAudioUrl,
  AudioRenderer,
} from '@/serlo-editor/plugins/audio/renderer'

export interface AudioProps {
  src: string
  license?: LicenseData
}

export function Audio({ src }: AudioProps) {
  const [iframeSrc, type] = parseAudioUrl(src)

  return (
    <>
      <AudioRenderer src={iframeSrc} type={type} />
      <p className="serlo-p hidden print:block">[{src}]</p>
    </>
  )
}
