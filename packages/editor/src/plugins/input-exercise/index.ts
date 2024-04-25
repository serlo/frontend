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

function createInputExerciseState() {
  const answerObject = object({
    value: string(''),
    isCorrect: boolean(true),
    feedback: child({ plugin: EditorPluginType.Text }),
  })

  return object({
    type: string(InputExerciseType.NumberExact),
    unit: string(''),
    answers: list(answerObject, 1),
  })
}

export type InputExercisePluginState = ReturnType<
  typeof createInputExerciseState
>

export type InputExerciseProps = EditorPluginProps<InputExercisePluginState>

export function createInputExercisePlugin(): EditorPlugin<InputExercisePluginState> {
  return {
    Component: InputExerciseEditor,
    config: {},
    state: createInputExerciseState(),
  }
}
