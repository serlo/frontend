import { ScMcExerciseRenderer } from './renderer'
import { isEmptyTextPlugin } from '../text/utils/static-is-empty'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorScMcExercisePlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function ScMcExerciseStaticRenderer({
  state,
}: EditorScMcExercisePlugin & { idBase: string }) {
  const answers = state.answers
    .slice(0)
    .map(({ isCorrect, feedback, content }) => {
      return {
        isCorrect,
        feedback: isEmptyTextPlugin(feedback) ? null : (
          <StaticRenderer state={feedback} />
        ),
        content: isEmptyTextPlugin(content) ? null : (
          <StaticRenderer state={content} />
        ),
      }
    })

  return (
    <ScMcExerciseRenderer
      isSingleChoice={!!state.isSingleChoice}
      idBase="123" // TODO!
      answers={answers}
      // onEvaluate={onEvaluate} // TODO!
      // renderExtraAnswerContent={renderRevisionExtra} // TODO!
    />
  )
}
