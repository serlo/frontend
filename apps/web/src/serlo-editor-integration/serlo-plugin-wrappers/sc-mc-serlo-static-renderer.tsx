import { ScMcExerciseRendererAnswer } from '@editor/plugins/sc-mc-exercise/renderer/renderer'
import { ScMcExerciseStaticRenderer } from '@editor/plugins/sc-mc-exercise/static'
import { EditorScMcExerciseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { isPrintMode } from '@/components/print-mode'
import { useAB } from '@/contexts/ab'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { useEntityId, useRevisionId } from '@/contexts/uuids-context'
import {
  ExerciseSubmissionData,
  exerciseSubmission,
} from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

export function ScMcSerloStaticRenderer(props: EditorScMcExerciseDocument) {
  const { asPath } = useRouter()
  const ab = useAB()
  const entityId = useEntityId()
  const revisionId = useRevisionId()
  const isRevisionView = useContext(RevisionViewContext)
  const trackExperiment = useCreateExerciseSubmissionMutation()

  const exStrings = useInstanceData().strings.content.exercises

  // better idea anyone? 🙈
  const idFallbackHack = props.id ?? JSON.stringify(props.state.answers)
  // The old version used node.positionOnPage, node.context.id, node.positionInGroup AND path to generate a unique key 😅
  // for newer revisions it would just use the documents id from database but…

  return (
    <ScMcExerciseStaticRenderer
      {...props}
      isPrintMode={isPrintMode}
      idBase={`sc-mc-${idFallbackHack}`}
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
