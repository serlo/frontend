import { InputExerciseStaticRenderer } from '@editor/plugins/input-exercise/static'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorInputExerciseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { useAB } from '@/contexts/ab'
import { ExerciseIdsContext } from '@/contexts/exercise-ids-context'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { useRevisionId } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

export function InputSerloStaticRenderer(props: EditorInputExerciseDocument) {
  const exerciseIds = useContext(ExerciseIdsContext)
  const revisionId = useRevisionId()
  const exStrings = useInstanceData().strings.content.exercises
  const { asPath } = useRouter()
  const ab = useAB()
  const isRevisionView = useContext(RevisionViewContext)
  const trackExperiment = useCreateExerciseSubmissionMutation(asPath)

  return (
    <>
      <InputExerciseStaticRenderer {...props} onEvaluate={onEvaluate} />
      {isRevisionView ? renderRevisionExtra() : null}
    </>
  )

  function onEvaluate(correct: boolean, val: string) {
    exerciseSubmission(
      {
        path: asPath,
        entityId: exerciseIds?.exerciseTrackingId,
        revisionId,
        result: correct ? 'correct' : 'wrong',
        type: 'input',
      },
      ab,
      trackExperiment
    )
    exerciseSubmission(
      {
        path: asPath,
        entityId: exerciseIds?.exerciseTrackingId,
        revisionId,
        result: val.substring(0, 200),
        type: 'ival',
      },
      ab,
      trackExperiment
    )
  }

  function renderRevisionExtra() {
    return props.state.answers.map((answer) => (
      <div
        key={answer.value}
        className="serlo-revision-extra-info mb-4 rounded-xl bg-editor-primary-100 py-2"
      >
        <span className="mx-side text-sm font-bold">
          {exStrings.answer} {answer.isCorrect && `[${exStrings.correct}]`}:
        </span>
        {answer.value}
        <StaticRenderer document={answer.feedback} />
      </div>
    ))
  }
}
