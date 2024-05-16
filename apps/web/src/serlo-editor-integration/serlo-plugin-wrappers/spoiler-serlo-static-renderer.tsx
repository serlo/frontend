import { SpoilerStaticRenderer } from '@editor/plugins/spoiler/static'
import { EditorSpoilerDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useAB } from '@/contexts/ab'
import { useEntityData } from '@/contexts/serlo-entity-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

export function SpoilerSerloStaticRenderer({
  ...props
}: EditorSpoilerDocument & { openOverwrite?: boolean; onOpen?: () => void }) {
  const [hasSentSpoilerTrackingEvent, setHasSentSpoilerTrackingEvent] =
    useState(false)

  const ab = useAB()
  const { entityId, revisionId } = useEntityData()
  const { asPath } = useRouter()

  const trackExperiment = useCreateExerciseSubmissionMutation(asPath)
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
