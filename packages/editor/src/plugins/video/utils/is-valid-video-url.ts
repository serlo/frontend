import { parseVideoUrl } from './parse-video-url'

export function isValidVideoUrl(inputSrc: string) {
  const [, type] = parseVideoUrl(inputSrc)
  return type !== undefined
}
