import { faFilm } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'

export enum AudioType {
  Vocaroo = 'vocaroo',
}

interface AudioRendererProps {
  src: string
  type?: AudioType
}

export function AudioRenderer({ src, type }: AudioRendererProps) {
  const { strings } = useInstanceData()

  if (!type) {
    return (
      <div className="mx-side text-center print:hidden">
        <FaIcon icon={faFilm} className="h-16" />
        <p className="serlo-p text-almost-black">
          {src ? `${strings.content.loadingAudioFailed}: ${src}` : ''}
        </p>
      </div>
    )
  }

  if (type === AudioType.Vocaroo) {
    const vocarooIdMatch = src.match(/voca\.ro\/([\w\d]+)/)
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

  return <p>Unknown audio type</p>
}

export function parseAudioUrl(src: string): [string, AudioType | undefined] {
  const vocarooRegex = /^(https?:\/\/)?(voca\.ro\/)([a-zA-Z0-9_-]+)/
  if (vocarooRegex.test(src)) {
    return [src, AudioType.Vocaroo]
  }

  return [src, undefined]
}
