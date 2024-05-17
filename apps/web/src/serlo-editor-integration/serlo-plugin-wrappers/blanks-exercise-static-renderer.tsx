import { BlanksExerciseStaticRenderer } from '@editor/plugins/blanks-exercise/static'
import { EditorBlanksExerciseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'

import { useAB } from '@/contexts/ab'
import { useEntityData } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

export function BlanksExerciseSerloStaticRenderer(
  props: EditorBlanksExerciseDocument
) {
  const { asPath } = useRouter()
  const ab = useAB()
  const { entityId, revisionId } = useEntityData()
  const trackExperiment = useCreateExerciseSubmissionMutation(asPath)

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
