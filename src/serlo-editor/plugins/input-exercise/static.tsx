import { InputExerciseRenderer } from './renderer'
import { isEmptyTextPlugin } from '../text/utils/static-is-empty'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorInputExercisePlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function InputExerciseStaticRenderer({
  state,
  onEvaluate,
}: EditorInputExercisePlugin & {
  onEvaluate?: (correct: boolean, val: string) => void
}) {
  const answers = state.answers.map((answer) => {
    //TODO: check if this works of if it need to check answer.feedback[0]
    const isEmpty = isEmptyTextPlugin(answer.feedback)
    return {
      ...answer,
      feedback: isEmpty ? null : <StaticRenderer state={answer.feedback} />,
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
