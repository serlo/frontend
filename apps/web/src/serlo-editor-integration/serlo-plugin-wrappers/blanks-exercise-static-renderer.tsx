import { BlanksExerciseStaticRenderer } from '@editor/plugins/blanks-exercise/static'
import { EditorBlanksExerciseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { usePlausible } from 'next-plausible'

import { useAB } from '@/contexts/ab'
import { useEntityData } from '@/contexts/uuids-context'
import {
  ExerciseSubmissionData,
  exerciseSubmission,
} from '@/helper/exercise-submission'

export function BlanksExerciseSerloStaticRenderer(
  props: EditorBlanksExerciseDocument
) {
  const { asPath } = useRouter()
  const ab = useAB()
  const { entityId, revisionId } = useEntityData()
  const plausible = usePlausible()

  const trackExperiment = (data: ExerciseSubmissionData) => {
    if (data.result === 'correct') {
      plausible('exercise-submission-correct', {
        props: data,
      })
      return
    }

    plausible('exercise-submission-false', {
      props: data,
    })
  }

  return <BlanksExerciseStaticRenderer {...props} onEvaluate={onEvaluate} />

  function onEvaluate(correct: boolean) {
    exerciseSubmission(
      {
        path: asPath,
        entityId,
        revisionId,
        result: correct ? 'correct' : 'wrong',
        type: 'blanks',
      },
      ab,
      trackExperiment
    )
  }
}
