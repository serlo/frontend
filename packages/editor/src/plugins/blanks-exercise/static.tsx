import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorBlanksExerciseDocument } from '@editor/types/editor-plugins'

import type { BlanksExerciseMode } from '.'
import { BlanksExerciseRenderer } from './renderer'

export function BlanksExerciseStaticRenderer({
  state: { text: childPlugin, mode, extraDraggableAnswers },
}: EditorBlanksExerciseDocument) {
  return (
    <BlanksExerciseRenderer
      childPlugin={<StaticRenderer document={childPlugin} />}
      childPluginState={childPlugin}
      mode={mode as BlanksExerciseMode}
      initialTextInBlank="empty"
      extraDraggableAnswers={extraDraggableAnswers}
      onEvaluate={(correct: boolean) => {
        editorLearnerEvent.trigger?.({
          verb: 'answered',
          correct,
          contentType: 'blanks-exercise',
        })
      }}
    />
  )
}
