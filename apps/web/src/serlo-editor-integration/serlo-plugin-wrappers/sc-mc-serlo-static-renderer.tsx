import { ScMcExerciseRendererAnswer } from '@editor/plugins/sc-mc-exercise/renderer/renderer'
import { ScMcExerciseStaticRenderer } from '@editor/plugins/sc-mc-exercise/static'
import { EditorScMcExerciseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { usePlausible } from 'next-plausible'
import { useContext } from 'react'

import { isPrintMode } from '@/components/print-mode'
import { useAB } from '@/contexts/ab'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { useEntityData } from '@/contexts/uuids-context'
import {
  ExerciseSubmissionData,
  exerciseSubmission,
} from '@/helper/exercise-submission'

export function ScMcSerloStaticRenderer(props: EditorScMcExerciseDocument) {
  const { asPath } = useRouter()
  const ab = useAB()
  const { entityId, revisionId } = useEntityData()
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
  const exStrings = useInstanceData().strings.content.exercises

  return (
    <ScMcExerciseStaticRenderer
      {...props}
      isPrintMode={isPrintMode}
      onEvaluate={onEvaluate}
      renderExtraAnswerContent={renderRevisionExtra}
    />
  )

  function onEvaluate(correct: boolean, type: ExerciseSubmissionData['type']) {
    exerciseSubmission(
      {
        path: asPath,
        entityId,
        revisionId,
        result: correct ? 'correct' : 'wrong',
        type,
      },
      ab,
      trackExperiment
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
