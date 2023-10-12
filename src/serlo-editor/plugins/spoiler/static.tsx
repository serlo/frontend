import { SpoilerRenderer } from './renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorSpoilerPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function SpoilerStaticRenderer({
  state,
  openOverwrite,
}: EditorSpoilerPlugin & { openOverwrite?: boolean }) {
  const { title, content } = state
  return (
    <SpoilerRenderer
      title={<>{title}</>}
      content={<StaticRenderer document={content} />}
      openOverwrite={openOverwrite}
    />
  )
}
