import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorSpoilerDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import { SpoilerRenderer } from './renderer'
import { spoilerOpened } from '@/helper/tracking/spoiler-opened'

export function SpoilerStaticRenderer({
  state,
  openOverwrite,
}: EditorSpoilerDocument & { openOverwrite?: boolean }) {
  const { title, content } = state
  const [hasSentSpoilerTrackingEvent, setHasSentSpoilerTrackingEvent] = useState(false)

  const trackSpoilerOpened = () => {
    if(hasSentSpoilerTrackingEvent) return
    // send tracking event
    spoilerOpened({
      entityId: content.id,
    })
    setHasSentSpoilerTrackingEvent(true)
  }

  return (
    <SpoilerRenderer
      title={<>{title}</>}
      content={<StaticRenderer document={content} />}
      openOverwrite={openOverwrite}
      onOpen={() => trackSpoilerOpened()}
    />
  )
}
