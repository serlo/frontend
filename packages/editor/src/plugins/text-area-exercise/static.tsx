import { TextAreaExerciseRenderer } from './renderer'
import { EditorTextAreaExerciseDocument } from '@/serlo-editor/types/editor-plugins'

export function TextAreaExerciseStaticRenderer(
  _: EditorTextAreaExerciseDocument
) {
  return <TextAreaExerciseRenderer />
}
