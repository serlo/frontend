import { TextAreaExerciseEditor } from './editor'
import {
  type EditorPlugin,
  object,
  EditorPluginProps,
} from '@/serlo-editor/plugin'

function createTextAreaExerciseState() {
  return object({})
}

export const textAreaExercisePlugin: EditorPlugin<TextAreaExercisePluginState> =
  {
    Component: TextAreaExerciseEditor,
    state: createTextAreaExerciseState(),
    config: {},
  }

export type TextAreaExercisePluginState = ReturnType<
  typeof createTextAreaExerciseState
>
export type TextAreaExerciseProps =
  EditorPluginProps<TextAreaExercisePluginState>
