import { ScMcExerciseRenderer, ScMcExerciseRendererProps } from './renderer'
import { isEmptyTextPlugin } from '../text/utils/static-is-empty'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorScMcExercisePlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function ScMcExerciseStaticRenderer({
  state,
  isPrintMode,
  idBase,
  onEvaluate,
  renderExtraAnswerContent,
}: EditorScMcExercisePlugin & {
  idBase: string
  isPrintMode?: boolean
  onEvaluate: ScMcExerciseRendererProps['onEvaluate']
  renderExtraAnswerContent: ScMcExerciseRendererProps['renderExtraAnswerContent']
}) {
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
      idBase={idBase}
      answers={answers}
      isPrintMode={isPrintMode}
      onEvaluate={onEvaluate}
      renderExtraAnswerContent={renderExtraAnswerContent}
    />
  )
}
