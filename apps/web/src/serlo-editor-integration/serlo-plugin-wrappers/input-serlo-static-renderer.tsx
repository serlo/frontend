import { InputExerciseStaticRenderer } from '@editor/plugins/input-exercise/static'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorInputExerciseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { usePlausible } from 'next-plausible'
import { useContext } from 'react'

import { useAB } from '@/contexts/ab'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { useEntityData } from '@/contexts/uuids-context'
import {
  ExerciseSubmissionData,
  exerciseSubmission,
} from '@/helper/exercise-submission'

export function InputSerloStaticRenderer(props: EditorInputExerciseDocument) {
  const { entityId, revisionId } = useEntityData()
  const exStrings = useInstanceData().strings.content.exercises
  const { asPath } = useRouter()
  const ab = useAB()
  const isRevisionView = useContext(RevisionViewContext)

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
        entityId,
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
        entityId,
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
