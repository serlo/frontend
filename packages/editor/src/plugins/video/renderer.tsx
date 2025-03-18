import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { cn } from '@editor/utils/cn'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

export enum VideoType {
  YouTube = 'YouTube',
  SerloAsset = 'SerloAsset',
  Vimeo = 'Vimeo',
}

interface VideoRendererProps {
  src: string
  type?: VideoType
}

export function VideoRenderer({ src, type }: VideoRendererProps) {
  const videoStrings = useStaticStrings().plugins.video

  if (!type) {
    return (
      <div className="mx-side text-center print:hidden">
        <FaIcon icon={faFilm} className="h-16" />
        <p className="serlo-p text-almost-black">
          {src ? `${videoStrings.failed}: ${src}` : ''}
        </p>
      </div>
    )
  }

  return (
    <div className="my-0 aspect-[16/9] w-full p-0">
      {type === VideoType.SerloAsset ? (
        <video controls src={src} className={videoClassName} />
      ) : (
        <iframe
          src={src}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className={videoClassName}
        />
      )}
    </div>
  )
}

const videoClassName = cn(`h-full w-full border-none bg-black/30`)
