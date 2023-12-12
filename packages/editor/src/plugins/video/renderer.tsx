import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { Instance } from '@serlo/frontend/src/fetcher/graphql-types/operations'
import { cn } from '@serlo/tailwind/helper/cn'

export enum VideoType {
  YouTube = 'YouTube',
  WikimediaCommons = 'WikimediaCommons',
  Vimeo = 'Vimeo',
}

interface VideoRendererProps {
  src: string
  type?: VideoType
}

export function VideoRenderer({ src, type }: VideoRendererProps) {
  const { strings } = useInstanceData()

  if (!type) {
    return (
      <div className="mx-side text-center print:hidden">
        <FaIcon icon={faFilm} className="h-16" />
        <p className="serlo-p text-almost-black">
          {src ? `${strings.content.loadingVideoFailed}: ${src}` : ''}
        </p>
      </div>
    )
  }

  return (
    <div className="mx-side my-0  p-0">
      {type === VideoType.WikimediaCommons ? (
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

const videoClassName = cn(
  `absolute left-0 top-0 z-20 h-full w-full border-none bg-black/30`
)

export function parseVideoUrl(
  checkSrc: string,
  lang?: Instance
): [string, VideoType | undefined] {
  const videoRegex = /^(https?:\/\/)?(.*?vimeo\.com\/)(.+)/
  const vimeo = videoRegex.exec(checkSrc)
  if (vimeo)
    return [
      `https://player.vimeo.com/video/${vimeo[3]}?autoplay=1`,
      VideoType.Vimeo,
    ]

  const wikimediaRegex = /^(https?:\/\/)?(.*?upload\.wikimedia\.org\/)(.+)/
  const wikimedia = wikimediaRegex.exec(checkSrc)
  if (wikimedia) return [checkSrc, VideoType.WikimediaCommons]

  const youtubeRegex =
    /^(https?:\/\/)?(.*?youtube\.com\/watch\?(.*&)?v=|.*?youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const youtube = youtubeRegex.exec(checkSrc)
  if (youtube) {
    const path = youtube[4]
    const videoId = encodeURIComponent(path.split('&', 1)[0])
    const useSubtitles = path.indexOf('cc_load_policy=1') > 0
    const iframeSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&html5=1${
      useSubtitles ? `&cc_lang_pref=${lang ?? 'de'}&cc_load_policy=1` : ''
    }`
    return [iframeSrc, VideoType.YouTube]
  }
  return [checkSrc, undefined]
}
