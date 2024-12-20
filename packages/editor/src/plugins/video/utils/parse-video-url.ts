import { VideoType } from '../renderer'

export function parseVideoUrl(
  inputSrc: string,
  lang?: string
): [string, VideoType | undefined] {
  const videoRegex = /^(https?:\/\/)?(.*?vimeo\.com\/)(.+)/
  const vimeo = videoRegex.exec(inputSrc)
  if (vimeo)
    return [
      `https://player.vimeo.com/video/${vimeo[3]}?autoplay=1`,
      VideoType.Vimeo,
    ]
  const serloAssetRegex =
    /^(https:\/\/assets\.serlo\.org\/wikimedia\/)(.+)(webm)$/
  const serloAsset = serloAssetRegex.exec(inputSrc)
  if (serloAsset) return [inputSrc, VideoType.SerloAsset]

  // TODO: update when new asset management is live
  if (
    inputSrc.startsWith('https://editor.serlo.dev/media/') &&
    inputSrc.endsWith('video.webm')
  ) {
    return [inputSrc, VideoType.SerloAsset]
  }

  const youtubeRegex =
    /^(https?:\/\/)?(.*?youtube\.com\/watch\?(.*&)?v=|.*?youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const youtube = youtubeRegex.exec(inputSrc)
  if (youtube) {
    const videoId = encodeURIComponent(youtube[4])
    const url = new URL(inputSrc)
    const timestamp = parseInt(url.searchParams.get('t') ?? '')
    const useSubtitles = url.search.includes('cc_load_policy=1')
    const iframeSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&html5=1${
      useSubtitles ? `&cc_lang_pref=${lang ?? 'de'}&cc_load_policy=1` : ''
    }${isNaN(timestamp) ? '' : `&start=${timestamp}`}`
    return [iframeSrc, VideoType.YouTube]
  }
  return [inputSrc, undefined]
}
