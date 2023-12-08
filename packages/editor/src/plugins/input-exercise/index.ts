import { InputExerciseEditor } from './editor'
import { InputExerciseType } from './input-exercise-type'
import {
  type ChildStateTypeConfig,
  type EditorPlugin,
  type EditorPluginProps,
  boolean,
  child,
  list,
  object,
  string,
} from '../../plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

function createInputExerciseState(
  feedback: ChildStateTypeConfig<string, unknown>
) {
  const answerObject = object({
    value: string(''),
    isCorrect: boolean(true),
    feedback: child(feedback),
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

export interface InputExerciseConfig {
  feedback: ChildStateTypeConfig
}

export type InputExerciseProps = EditorPluginProps<
  InputExercisePluginState,
  InputExerciseConfig
>

const defaultFeedback = { plugin: EditorPluginType.Text }

export function createInputExercisePlugin(
  config: InputExerciseConfig = { feedback: defaultFeedback }
): EditorPlugin<InputExercisePluginState, InputExerciseConfig> {
  return {
    Component: InputExerciseEditor,
    config: config,
    state: createInputExerciseState(config.feedback),
  }
}
