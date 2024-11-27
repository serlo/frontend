import { EditorTextAreaExerciseDocument } from '@editor/types/editor-plugins'

import { TextAreaExerciseRenderer } from './renderer'

export function TextAreaExerciseStaticRenderer(
  state: EditorTextAreaExerciseDocument
) {
  return (
    <TextAreaExerciseRenderer
      scaffoldingEnabled={state.state.scaffoldingEnabled}
    />
  )
}
