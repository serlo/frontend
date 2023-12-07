import { TextAreaExerciseEditor } from './editor'
import {
  type EditorPlugin,
  object,
  EditorPluginProps,
} from '@/serlo-editor/plugin'

function createTextAreaExerciseState() {
  return object({})
}

export const textAreaExercisePlugin: EditorPlugin<TextAreaExerciseState> = {
  Component: TextAreaExerciseEditor,
  state: createTextAreaExerciseState(),
  config: {},
}

export type TextAreaExerciseState = ReturnType<
  typeof createTextAreaExerciseState
>
export type TextAreaExerciseProps = EditorPluginProps<TextAreaExerciseState>
