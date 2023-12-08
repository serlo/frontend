import type { Element } from 'slate'

import { InputExerciseRenderer } from './renderer'
import { StaticSlate } from '../text/static-components/static-slate'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'
import { EditorInputExerciseDocument } from '@/serlo-editor/types/editor-plugins'

export function InputExerciseStaticRenderer({
  state,
  onEvaluate,
}: EditorInputExerciseDocument & {
  onEvaluate?: (correct: boolean, val: string) => void
}) {
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
      type={state.type}
      unit={state.unit}
      answers={answers}
      onEvaluate={onEvaluate}
    />
  )
}
