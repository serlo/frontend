import { SpoilerStaticRenderer } from '@editor/plugins/spoiler/static'
import { EditorSpoilerDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import { useAB } from '@/contexts/ab'
import { UuidsContext } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

export function SpoilerSerloStaticRenderer({
  ...props
}: EditorSpoilerDocument & { openOverwrite?: boolean; onOpen?: () => void }) {
  const [hasSentSpoilerTrackingEvent, setHasSentSpoilerTrackingEvent] =
    useState(false)

  const ab = useAB()
  // using context directly here so we can use the spoiler outside of entities
  const uuidsData = useContext(UuidsContext)
  const entityId = uuidsData?.entityId
  const revisionId = uuidsData?.revisionId
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
