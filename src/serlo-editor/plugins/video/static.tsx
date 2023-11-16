import { useInstanceData } from '@/contexts/instance-context'
import {
  parseVideoUrl,
  VideoRenderer,
} from '@/serlo-editor/plugins/video/renderer'
import { EditorVideoDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function VideoStaticRenderer({ state: { src } }: EditorVideoDocument) {
  const { lang } = useInstanceData()

  const [iframeSrc, type] = parseVideoUrl(src, lang)
  if (!type || !iframeSrc) return null

  return <VideoRenderer src={iframeSrc} type={type} />
}
