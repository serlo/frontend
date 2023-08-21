import { LicenseData } from '@/data-types'
import {
  parseAudioUrl,
  AudioRenderer,
} from '@/serlo-editor/plugins/audio/renderer'

export interface AudioProps {
  srcOrBase64: string
  license?: LicenseData
}

export function Audio({ srcOrBase64 }: AudioProps) {
  const [iframeSrcOrBase64, type] = parseAudioUrl(srcOrBase64)

  return (
    <>
      <AudioRenderer srcOrBase64={iframeSrcOrBase64} type={type} />
      <p className="serlo-p hidden print:block">[{srcOrBase64}]</p>
    </>
  )
}
