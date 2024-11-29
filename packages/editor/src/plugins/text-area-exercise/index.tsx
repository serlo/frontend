import {
  type EditorPlugin,
  object,
  EditorPluginProps,
  boolean,
  string,
} from '@editor/plugin'

import { TextAreaExerciseEditor } from './editor'

function createTextAreaExerciseState() {
  return object({
    scaffoldingEnabled: boolean(false),
    solution: string('banana'),
  })
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
