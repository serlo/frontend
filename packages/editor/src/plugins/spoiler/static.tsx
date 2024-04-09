import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorSpoilerDocument } from '@editor/types/editor-plugins'

import { SpoilerRenderer } from './renderer'

export function SpoilerStaticRenderer({
  state,
  openOverwrite,
  onOpen,
}: EditorSpoilerDocument & { openOverwrite?: boolean; onOpen?: () => void }) {
  const { title, richTitle, content } = state

  const renderedTitle = richTitle ? (
    <StaticRenderer document={richTitle} />
  ) : (
    <>{title}</>
  )

  return (
    <SpoilerRenderer
      title={renderedTitle}
      content={<StaticRenderer document={content} />}
      openOverwrite={openOverwrite}
      onOpen={onOpen}
    />
  )
}
