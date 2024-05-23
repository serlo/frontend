import { SpoilerStaticRenderer } from '@editor/plugins/spoiler/static'
import { EditorSpoilerDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { usePlausible } from 'next-plausible'
import { useState } from 'react'

import { useAB } from '@/contexts/ab'
import { useEntityData } from '@/contexts/uuids-context'
import {
  ExerciseSubmissionData,
  exerciseSubmission,
} from '@/helper/exercise-submission'

export function SpoilerSerloStaticRenderer({
  ...props
}: EditorSpoilerDocument & { openOverwrite?: boolean; onOpen?: () => void }) {
  const [hasSentSpoilerTrackingEvent, setHasSentSpoilerTrackingEvent] =
    useState(false)

  const ab = useAB()
  const { entityId, revisionId } = useEntityData()
  const { asPath } = useRouter()

  const plausible = usePlausible()

  const trackExperiment = (data: ExerciseSubmissionData) => {
    plausible('spoiler-opened', {
      props: data,
    })
  }
  const trackSpoilerOpened = () => {
    if (hasSentSpoilerTrackingEvent) return
    // send tracking event
    exerciseSubmission(
      {
        path: asPath,
        entityId,
        revisionId,
        result: 'open',
        type: 'spoiler',
      },
      ab,
      trackExperiment
    )
    setHasSentSpoilerTrackingEvent(true)
  }

  return (
    <SpoilerStaticRenderer onOpen={() => trackSpoilerOpened()} {...props} />
  )
}
