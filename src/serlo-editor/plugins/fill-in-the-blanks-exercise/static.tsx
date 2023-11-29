import { FillInTheBlanksRenderer } from './renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorFillInTheBlanksExerciseDocument } from '@/serlo-editor/types/editor-plugins'

export function FillInTheBlanksStaticRenderer(
  state: EditorFillInTheBlanksExerciseDocument
) {
  const { text, mode } = state.state
  return (
    <FillInTheBlanksRenderer
      text={<StaticRenderer document={text} />}
      textPluginState={text}
      mode={mode}
    />
  )
}
