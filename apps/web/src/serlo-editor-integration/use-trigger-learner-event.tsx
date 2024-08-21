import { LearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { useAB } from '@/contexts/ab'
import { ExerciseContext } from '@/contexts/exercise-context'
import { useEntityData } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

export function useTriggerLearnerEvent() {
  const { asPath } = useRouter()
  const ab = useAB()
  const { revisionId } = useEntityData()
  const { exerciseTrackingId } = useContext(ExerciseContext)
  const trackExperiment = useCreateExerciseSubmissionMutation(asPath)

  function triggerLearnerEvent(data: LearnerEvent) {
    // eslint-disable-next-line no-console
    console.log(data)

    const { correct, contentType } = data

    exerciseSubmission(
      {
        path: asPath,
        entityId: exerciseTrackingId,
        revisionId,
        result: correct ? 'correct' : 'wrong',
        // @ts-expect-error differing type strings
        type: contentType,
      },
      ab,
      trackExperiment
    )
  }
  return triggerLearnerEvent
}
