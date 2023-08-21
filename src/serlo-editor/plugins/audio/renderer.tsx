import { faFilm } from '@fortawesome/free-solid-svg-icons'

import { AudioPlayer } from './audio-player'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'

export enum AudioType {
  File = 'file',
  Vocaroo = 'vocaroo',
}

interface AudioRendererProps {
  srcOrBase64: string
  type?: AudioType
}

export function AudioRenderer({ srcOrBase64, type }: AudioRendererProps) {
  const { strings } = useInstanceData()

  if (!type) {
    return (
      <div className="mx-side text-center print:hidden">
        <FaIcon icon={faFilm} className="h-16" />
        <p className="serlo-p text-almost-black">
          {srcOrBase64
            ? `${strings.content.loadingAudioFailed}: ${srcOrBase64}`
            : ''}
        </p>
      </div>
    )
  }

  if (type === AudioType.Vocaroo) {
    const vocarooIdMatch = srcOrBase64.match(/voca\.ro\/([\w\d]+)/)
    const vocarooId = vocarooIdMatch ? vocarooIdMatch[1] : null

    return (
      <div>
        <iframe
          width="300"
          height="60"
          src={`https://vocaroo.com/embed/${vocarooId}?autoplay=0`}
          allow="autoplay"
        />
      </div>
    )
  }

  if (type === AudioType.File) {
    return <AudioPlayer audioFile={srcOrBase64} />
  }

  return <p>Unknown audio type</p>
}

export function parseAudioUrl(
  srcOrBase64: string
): [string, AudioType | undefined] {
  const vocarooRegex = /^(https?:\/\/)?(voca\.ro\/)([a-zA-Z0-9_-]+)/
  if (vocarooRegex.test(srcOrBase64)) {
    return [srcOrBase64, AudioType.Vocaroo]
  }

  const base64Regex = /^data:audio\/[a-zA-Z0-9-+]+;base64,/
  if (base64Regex.test(srcOrBase64)) {
    return [srcOrBase64, AudioType.File]
  }

  return [srcOrBase64, undefined]
}
