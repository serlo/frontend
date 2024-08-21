import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorSpoilerDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import { SpoilerRenderer } from './renderer'

export function SpoilerStaticRenderer({
  state,
  openOverwrite,
}: EditorSpoilerDocument & { openOverwrite?: boolean }) {
  const [eventAlreadySent, setEventAlreadySent] = useState(false)

  const { title, richTitle, content } = state

  const renderedTitle = richTitle ? (
    <StaticRenderer document={richTitle} />
  ) : (
    <>{title}</>
  )

  function onOpen() {
    if (openOverwrite || eventAlreadySent) return
    editorLearnerEvent.trigger?.({ contentType: 'spoiler', value: 'open' })
    setEventAlreadySent(true)
  }

  return (
    <SpoilerRenderer
      title={renderedTitle}
      content={<StaticRenderer document={content} />}
      openOverwrite={openOverwrite}
      onOpen={onOpen}
    />
  )
}
