import { EditorTextAreaExerciseDocument } from '@editor/types/editor-plugins'

import { TextAreaExerciseRenderer } from './renderer'
import { TextAreaPluginStateContext } from './text-area-plugin-state-context'

// Schüly Ansicht
export function TextAreaExerciseStaticRenderer(
  state: EditorTextAreaExerciseDocument
) {
  return (
    <TextAreaPluginStateContext.Provider value={state}>
      <TextAreaExerciseRenderer />
    </TextAreaPluginStateContext.Provider>
  )
}
