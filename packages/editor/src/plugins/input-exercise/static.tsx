import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { EditorInputExerciseDocument } from '@editor/types/editor-plugins'
import type { Element } from 'slate'

import type { InputExerciseType } from './input-exercise-type'
import { InputExerciseRenderer } from './renderer'
import { useExerciseId } from '../exercise/context/exercise-id-context'
import { StaticSlate } from '../text/static-components/static-slate'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'

export function InputExerciseStaticRenderer({
  state,
}: EditorInputExerciseDocument) {
  const exerciseId = useExerciseId()

  const answers = state.answers.map((answer) => {
    const hasFeedback = !isEmptyTextDocument(answer.feedback)
    const unwrappedFeedback = (answer.feedback.state as Element[])?.[0].children
    return {
      ...answer,
      feedback: hasFeedback ? (
        <StaticSlate element={unwrappedFeedback} />
      ) : null,
    }
  })

  return (
    <InputExerciseRenderer
      type={state.type as InputExerciseType}
      unit={state.unit}
      answers={answers}
      onEvaluate={(correct: boolean, value: string) => {
        editorLearnerEvent.trigger?.({
          pluginId: exerciseId,
          verb: 'answered',
          correct,
          value,
          contentType: 'input-exercise',
        })
      }}
    />
  )
}
