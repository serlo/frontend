import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { parseVideoUrl, VideoRenderer } from '@editor/plugins/video/renderer'
import { EditorVideoDocument } from '@editor/types/editor-plugins'

export function VideoStaticRenderer({ state: { src } }: EditorVideoDocument) {
  const { lang } = useEditStrings()

  const [iframeSrc, type] = parseVideoUrl(src, lang)
  if (!type || !iframeSrc) return null

  return <VideoRenderer src={iframeSrc} type={type} />
}
