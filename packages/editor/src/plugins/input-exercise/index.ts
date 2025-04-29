import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { InputExerciseEditor } from './editor'
import { InputExerciseType } from './input-exercise-type'
import {
  type EditorPlugin,
  type EditorPluginProps,
  boolean,
  child,
  list,
  object,
  string,
} from '../../plugin'

const answerObject = object({
  value: string(''),
  isCorrect: boolean(true),
  feedback: child({ plugin: EditorPluginType.Text }),
})

const inputExerciseState = object({
  type: string(InputExerciseType.NumberExact),
  unit: string(''),
  answers: list(answerObject, 1),
})

export type InputExercisePluginState = typeof inputExerciseState
export type InputExerciseProps = EditorPluginProps<InputExercisePluginState>

export const inputExercisePlugin: EditorPlugin<InputExercisePluginState> = {
  Component: InputExerciseEditor,
  state: inputExerciseState,
}
