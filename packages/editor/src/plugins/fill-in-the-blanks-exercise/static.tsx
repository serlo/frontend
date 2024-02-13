import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorFillInTheBlanksExerciseDocument } from '@editor/types/editor-plugins'

import type { FillInTheBlanksMode } from '.'
import {
  FillInTheBlanksRenderer,
  FillInTheBlanksRendererProps,
} from './renderer'

export function FillInTheBlanksStaticRenderer({
  state: { text, mode, extraDraggableAnswers },
  onEvaluate,
}: EditorFillInTheBlanksExerciseDocument & {
  onEvaluate?: FillInTheBlanksRendererProps['onEvaluate']
}) {
  return (
    <FillInTheBlanksRenderer
      text={<StaticRenderer document={text} />}
      textPluginState={text}
      mode={mode as FillInTheBlanksMode}
      initialTextInBlank="empty"
      extraDraggableAnswers={extraDraggableAnswers}
      onEvaluate={onEvaluate}
    />
  )
}
