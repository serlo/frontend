import { BlanksExerciseStaticRenderer } from '@editor/plugins/blanks-exercise/static'
import { EditorBlanksExerciseTypingDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { useAB } from '@/contexts/ab'
import { ExerciseContext } from '@/contexts/exercise-context'
import { useEntityData } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

export function BlanksExerciseSerloStaticRenderer(
  props: EditorBlanksExerciseTypingDocument
) {
  const { asPath } = useRouter()
  const ab = useAB()
  const { revisionId } = useEntityData()
  const { exerciseTrackingId } = useContext(ExerciseContext)
  const trackExperiment = useCreateExerciseSubmissionMutation(asPath)

  return <BlanksExerciseStaticRenderer {...props} onEvaluate={onEvaluate} />

  function onEvaluate(correct: boolean) {
    exerciseSubmission(
      {
        path: asPath,
        entityId: exerciseTrackingId,
        revisionId,
        result: correct ? 'correct' : 'wrong',
        type: 'blanks',
      },
      ab,
      trackExperiment
    )
  }
}
