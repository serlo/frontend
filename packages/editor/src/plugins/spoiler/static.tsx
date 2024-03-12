import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorSpoilerDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import { SpoilerRenderer } from './renderer'
import { abSubmission } from '@/helper/ab-submission'
import { useAB } from '@/contexts/ab'

export function SpoilerStaticRenderer({
  state,
  openOverwrite,
}: EditorSpoilerDocument & { openOverwrite?: boolean }) {
  const { title, content } = state
  const [hasSentSpoilerTrackingEvent, setHasSentSpoilerTrackingEvent] = useState(false)

  const ab = useAB()

  const trackSpoilerOpened = () => {
    if(!ab || hasSentSpoilerTrackingEvent) return
    // send tracking event
    abSubmission({
      entityId: -1, // should this be a real id?
      experiment: ab.experiment,
      group: ab.group,
      result: "open",
      topicId: ab.topicId,
      type: 'spoiler',
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
