import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorFillInTheBlanksExerciseDocument } from '@editor/types/editor-plugins'

import type { FillInTheBlanksMode } from '.'
import { FillInTheBlanksRenderer } from './renderer'

export function FillInTheBlanksStaticRenderer({
  state: { text, mode, additionalDraggableAnswers },
}: EditorFillInTheBlanksExerciseDocument) {
  return (
    <FillInTheBlanksRenderer
      text={<StaticRenderer document={text} />}
      textPluginState={text}
      mode={mode as FillInTheBlanksMode}
      initialTextInBlank="empty"
      additionalDraggableAnswers={additionalDraggableAnswers}
    />
  )
}
