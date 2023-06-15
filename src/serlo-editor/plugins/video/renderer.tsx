import { faFilm } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'
import { Instance } from '@/fetcher/graphql-types/operations'
import { tw } from '@/helper/tw'

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
  if (!type) {
    return (
      <div className="text-center print:hidden">
        <FaIcon icon={faFilm} className="h-16" />
        {/* TODO: i18n */}
        <p className="serlo-p text-almost-black">
          {src ? `Loading video failed: ${src}` : ''}
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="m-0 p-0">
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
    </div>
  )
}

const videoClassName = tw`absolute top-0 left-0 z-20 h-full w-full border-none bg-black/30`

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
