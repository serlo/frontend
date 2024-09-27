import { parseVideoUrl, VideoRenderer } from '@editor/plugins/video/renderer'
import { EditorVideoDocument } from '@editor/types/editor-plugins'
import { useLang } from '@editor/utils/use-lang'

export function VideoStaticRenderer({ state: { src } }: EditorVideoDocument) {
  const lang = useLang()

  const [iframeSrc, type] = parseVideoUrl(src, lang)
  if (!type || !iframeSrc) return null

  return <VideoRenderer src={iframeSrc} type={type} />
}
