import confetti from 'canvas-confetti'
import { useRouter } from 'next/router'

import { useEntityId } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { EdtrPluginInputExercise } from '@/frontend-node-types'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { RenderNestedFunction } from '@/schema/article-renderer'
import { InputExerciseRenderer } from '@/serlo-editor/plugins/input-exercise/renderer'

export interface InputExerciseProps {
  data: EdtrPluginInputExercise['state']
  renderNested: RenderNestedFunction
  isRevisionView?: boolean
  context: {
    entityId: number
    revisionId: number
  }
}

export function InputExercise({
  data,
  renderNested,
  isRevisionView,
  context,
}: InputExerciseProps) {
  const exStrings = useInstanceData().strings.content.exercises
  const { asPath } = useRouter()

  const entityId = useEntityId()

  return (
    <>
      <InputExerciseRenderer
        type={data.type}
        unit={data.unit}
        answers={renderAnswers()}
        onEvaluate={onEvaluate}
      />
      {isRevisionView && renderRevisionExtra()}
    </>
  )

  function onEvaluate(correct: boolean) {
    if (correct && entityId === -42) {
      sessionStorage.setItem('prototype-' + context.entityId.toString(), '1')
      void confetti({
        angle: 60,
        origin: { x: 0 },
        zIndex: 210,
      })
      void confetti({
        angle: 120,
        origin: { x: 1 },
        zIndex: 210,
      })
    }
    exerciseSubmission({
      path: asPath,
      entityId: context.entityId,
      revisionId: context.revisionId,
      result: correct ? 'correct' : 'wrong',
      type: 'input',
    })
  }

  function renderAnswers() {
    return data.answers.map((answer) => {
      const isEmpty =
        !answer.feedback[0].children ||
        (answer.feedback[0].children?.length === 1 &&
          answer.feedback[0].children[0].children?.length === 0)

      return {
        ...answer,
        feedback: isEmpty ? null : <>{renderNested(answer.feedback)}</>,
      }
    })
  }

  function renderRevisionExtra() {
    return data.answers.map((answer) => (
      <div
        key={answer.value}
        className="serlo-revision-extra-info mb-4 rounded-xl bg-editor-primary-100 py-2"
      >
        <span className="mx-side text-sm font-bold">
          {exStrings.answer} {answer.isCorrect && `[${exStrings.correct}]`}:
        </span>
        {answer.value}
        {renderNested(answer.feedback, `mcfeedbackrevision`)}
      </div>
    ))
  }
}
