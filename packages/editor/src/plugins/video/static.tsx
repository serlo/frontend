import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { VideoRenderer } from '@editor/plugins/video/renderer'
import { EditorVideoDocument } from '@editor/types/editor-plugins'

import { parseVideoUrl } from './utils/parse-video-url'

export function VideoStaticRenderer({ state: { src } }: EditorVideoDocument) {
  const { lang } = useStaticStrings()

  const [iframeSrc, type] = parseVideoUrl(src as string, lang)
  if (!type || !iframeSrc) return null

  return <VideoRenderer src={iframeSrc} type={type} />
}
