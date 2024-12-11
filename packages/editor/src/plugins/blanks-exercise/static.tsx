import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorBlanksExerciseDocument } from '@editor/types/editor-plugins'

import type { BlanksExerciseMode } from '.'
import { BlanksExerciseRenderer } from './renderer'
import { useExerciseId } from '../exercise/context/exercise-id-context'

export function BlanksExerciseStaticRenderer({
  state: { text: childPlugin, mode, extraDraggableAnswers },
}: EditorBlanksExerciseDocument) {
  const exerciseId = useExerciseId()

  return (
    <BlanksExerciseRenderer
      childPlugin={<StaticRenderer document={childPlugin} />}
      childPluginState={childPlugin}
      mode={mode as BlanksExerciseMode}
      initialTextInBlank="empty"
      extraDraggableAnswers={extraDraggableAnswers}
      onEvaluate={(correct: boolean) => {
        editorLearnerEvent.trigger?.({
          pluginId: exerciseId,
          verb: 'answered',
          correct,
          contentType: 'blanks-exercise',
        })
      }}
    />
  )
}
