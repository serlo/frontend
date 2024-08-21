import { EditorInputExerciseDocument } from '@editor/types/editor-plugins'
import type { Element } from 'slate'

import type { InputExerciseType } from './input-exercise-type'
import { InputExerciseRenderer } from './renderer'
import { StaticSlate } from '../text/static-components/static-slate'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'
import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'

export function InputExerciseStaticRenderer({
  state,
}: EditorInputExerciseDocument) {
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
          verb: 'answered',
          correct,
          value,
          contentType: 'input-exercise',
        })
      }}
    />
  )
}
