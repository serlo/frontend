import { FillInTheGapRenderer } from './renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorFillInTheGapExerciseDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function FillInTheGapStaticRenderer(
  state: EditorFillInTheGapExerciseDocument
) {
  const { text, mode } = state.state
  return (
    <FillInTheGapRenderer
      text={<StaticRenderer document={text} />}
      textPluginState={text}
      mode={mode}
    />
  )
}
