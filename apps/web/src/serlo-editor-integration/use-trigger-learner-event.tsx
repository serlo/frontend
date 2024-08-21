import { LearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { ExerciseContext } from '@/contexts/exercise-context'
import { useEntityData } from '@/contexts/uuids-context'

export function useTriggerLearnerEvent() {
  const { asPath } = useRouter()
  const { revisionId } = useEntityData()
  const { exerciseTrackingId } = useContext(ExerciseContext)

  function triggerLearnerEvent(data: LearnerEvent) {
    // eslint-disable-next-line no-console
    console.log(data)

    const { correct, contentType } = data

    // eslint-disable-next-line no-console
    console.log({
      path: asPath,
      entityId: exerciseTrackingId,
      revisionId,
      result: correct ? 'correct' : 'wrong',
      type: contentType,
    })
  }

  return triggerLearnerEvent
}
