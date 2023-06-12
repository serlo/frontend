import {
  boolean,
  BooleanStateType,
  child,
  ChildStateType,
  ChildStateTypeConfig,
  EditorPlugin,
  EditorPluginProps,
  list,
  ListStateType,
  object,
  ObjectStateType,
  string,
  StringStateType,
} from '../../plugin'
import { InputExerciseEditor } from './editor'
import { InputExerciseType } from './input-exercise-type'

export function createInputExercisePlugin(
  config: InputExerciseConfig
): EditorPlugin<InputExercisePluginState, InputExerciseConfig> {
  const { feedback } = config

  return {
    Component: InputExerciseEditor,
    config,
    state: createState(),
  }

  function createState(): InputExercisePluginState {
    const answerObject = object({
      value: string(''),
      isCorrect: boolean(),
      feedback: child(feedback),
    })

    return object({
      type: string('input-string-normalized-match-challenge'),
      unit: string(''),
      answers: list(answerObject),
    })
  }
}

export interface InputExerciseConfig {
  feedback: ChildStateTypeConfig
}

export type InputExercisePluginState = ObjectStateType<{
  type: StringStateType
  unit: StringStateType
  answers: ListStateType<
    ObjectStateType<{
      value: StringStateType
      isCorrect: BooleanStateType
      feedback: ChildStateType
    }>
  >
}>

export { InputExerciseType }

export type InputExerciseProps = EditorPluginProps<
  InputExercisePluginState,
  InputExerciseConfig
>
