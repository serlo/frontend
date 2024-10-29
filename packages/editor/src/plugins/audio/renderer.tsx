import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

export enum AudioType {
  Vocaroo = 'vocaroo',
}

interface AudioRendererProps {
  src: string
  type?: AudioType
}

export function AudioRenderer({ src, type }: AudioRendererProps) {
  const audioStrings = useStaticStrings().plugins.audio

  if (!type) {
    return (
      <div className="mx-side text-center print:hidden">
        <FaIcon icon={faFilm} className="h-16" />
        <p className="serlo-p text-almost-black">
          {src ? `${audioStrings.failed}: ${src}` : ''}
        </p>
      </div>
    )
  }

  if (type === AudioType.Vocaroo) {
    const vocarooUrl = getVocarooUrl(src)

    return (
      <div>
        <iframe width="300" height="60" src={vocarooUrl} allow="autoplay" />
      </div>
    )
  }

  return <p>Unknown audio type</p>
}

export function getVocarooUrl(src: string) {
  const vocarooIdMatch = src.match(/voca\.ro\/([\w\d]+)/)
  const vocarooId = vocarooIdMatch ? vocarooIdMatch[1] : null
  return `https://vocaroo.com/embed/${vocarooId}?autoplay=0`
}

export function parseAudioUrl(src: string): [string, AudioType | undefined] {
  const vocarooRegex = /^(https?:\/\/)?(voca\.ro\/)([a-zA-Z0-9_-]+)/
  if (vocarooRegex.test(src)) {
    return [src, AudioType.Vocaroo]
  }

  return [src, undefined]
}
