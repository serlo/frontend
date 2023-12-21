import { EditorTextAreaExerciseDocument } from '@editor/types/editor-plugins'

import { TextAreaExerciseRenderer } from './renderer'

export function TextAreaExerciseStaticRenderer(
  _: EditorTextAreaExerciseDocument
) {
  return <TextAreaExerciseRenderer />
}
