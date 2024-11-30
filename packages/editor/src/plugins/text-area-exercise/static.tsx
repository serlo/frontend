import { EditorTextAreaExerciseDocument } from '@editor/types/editor-plugins'

import { TextAreaExerciseRenderer } from './renderer'
import { TextAreaStaticRendererContext } from './text-area-static-renderer-context'

// Schüly Ansicht
export function TextAreaExerciseStaticRenderer(
  state: EditorTextAreaExerciseDocument
) {
  return (
    <TextAreaStaticRendererContext.Provider value={state}>
      <TextAreaExerciseRenderer />
    </TextAreaStaticRendererContext.Provider>
  )
}
