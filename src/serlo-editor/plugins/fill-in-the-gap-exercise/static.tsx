import { FillInTheGapRenderer } from './renderer'
import { EditorFillInTheGapExerciseDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function FillInTheGapStaticRenderer(
  state: EditorFillInTheGapExerciseDocument
) {
  const { text, mode } = state.state
  return <FillInTheGapRenderer text={text} mode={mode} />
}
