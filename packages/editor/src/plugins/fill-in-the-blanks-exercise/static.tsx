import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorFillInTheBlanksExerciseDocument } from '@editor/types/editor-plugins'

import type { FillInTheBlanksMode } from '.'
import { FillInTheBlanksRenderer } from './renderer'

export function FillInTheBlanksStaticRenderer(
  state: EditorFillInTheBlanksExerciseDocument
) {
  const { text } = state.state
  return (
    <FillInTheBlanksRenderer
      text={<StaticRenderer document={text} />}
      textPluginState={text}
      mode={state.state.mode as FillInTheBlanksMode}
      initialTextInBlank="empty"
      additionalDraggableAnswers={state.state.additionalDraggableAnswers}
    />
  )
}
