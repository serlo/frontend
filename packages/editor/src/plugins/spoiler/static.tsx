import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorSpoilerDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { SpoilerRenderer } from './renderer'
import { useAB } from '@/contexts/ab'
import { useEntityId, useRevisionId } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'

export function SpoilerStaticRenderer({
  state,
  openOverwrite,
}: EditorSpoilerDocument & { openOverwrite?: boolean }) {
  const { title, content } = state
  const [hasSentSpoilerTrackingEvent, setHasSentSpoilerTrackingEvent] =
    useState(false)

  const ab = useAB()
  const entityId = useEntityId()
  const revisionId = useRevisionId()
  const { asPath } = useRouter()

  const trackSpoilerOpened = () => {
    if (!ab || hasSentSpoilerTrackingEvent) return
    // send tracking event
    exerciseSubmission(
      {
        path: asPath,
        entityId,
        revisionId,
        result: 'open',
        type: 'spoiler',
      },
      ab
    )
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
