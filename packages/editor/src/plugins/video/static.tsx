import { parseVideoUrl, VideoRenderer } from '@editor/plugins/video/renderer'
import { EditorVideoDocument } from '@editor/types/editor-plugins'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'

export function VideoStaticRenderer({ state: { src } }: EditorVideoDocument) {
  const { lang } = useInstanceData()

  const [iframeSrc, type] = parseVideoUrl(src, lang)
  if (!type || !iframeSrc) return null

  return <VideoRenderer src={iframeSrc} type={type} />
}
