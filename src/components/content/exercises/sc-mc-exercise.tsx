import { useRouter } from 'next/router'

import { useAB } from '@/contexts/ab'
import { useInstanceData } from '@/contexts/instance-context'
import { EditorPluginScMcExercise } from '@/frontend-node-types'
import {
  ExerciseSubmissionData,
  exerciseSubmission,
} from '@/helper/exercise-submission'
import { hasVisibleContent } from '@/helper/has-visible-content'
import type { RenderNestedFunction } from '@/schema/article-renderer'
import {
  ScMcExerciseRenderer,
  ScMcExerciseRendererAnswer,
} from '@/serlo-editor/plugins/sc-mc-exercise/renderer'

export interface ScMcExerciseProps {
  state: EditorPluginScMcExercise['state']
  idBase: string
  renderNested: RenderNestedFunction
  isRevisionView?: boolean
  context: {
    entityId: number
    revisionId: number
  }
}

export function ScMcExercise({
  state,
  idBase,
  renderNested,
  isRevisionView,
  context,
}: ScMcExerciseProps) {
  const exStrings = useInstanceData().strings.content.exercises

  const { asPath } = useRouter()
  const ab = useAB()

  return (
    <ScMcExerciseRenderer
      isSingleChoice={!!state.isSingleChoice}
      idBase={idBase}
      answers={state.answers
        .slice(0)
        .map(({ isCorrect, feedback, content }) => {
          return {
            isCorrect,
            feedback: hasVisibleContent(feedback) ? (
              <>{renderNested(feedback)}</>
            ) : null,
            content: hasVisibleContent(content) ? (
              <>{renderNested(content)}</>
            ) : null,
          }
        })}
      onEvaluate={onEvaluate}
      renderExtraAnswerContent={renderRevisionExtra}
    />
  )

  function onEvaluate(correct: boolean, type: ExerciseSubmissionData['type']) {
    exerciseSubmission(
      {
        path: asPath,
        entityId: context.entityId,
        revisionId: context.revisionId,
        result: correct ? 'correct' : 'wrong',
        type,
      },
      ab
    )
  }

  function renderRevisionExtra(
    answer: ScMcExerciseRendererAnswer,
    hasFeedback?: boolean
  ) {
    if (!isRevisionView || !hasFeedback) return null
    return (
      <div className="serlo-revision-extra-info mb-4 rounded-xl bg-editor-primary-200 py-2">
        {answer.isCorrect && (
          <span className="mx-side text-sm font-bold">
            [{exStrings.correct}]
          </span>
        )}
        {answer.feedback}
      </div>
    )
  }
}
