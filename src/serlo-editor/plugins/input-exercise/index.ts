import {
  boolean,
  child,
  ChildStateTypeConfig,
  EditorPlugin,
  EditorPluginProps,
  list,
  object,
  string,
} from '../../plugin'
import { InputExerciseEditor } from './editor'
import { InputExerciseType } from './input-exercise-type'

function createInputExerciseState(
  feedback: ChildStateTypeConfig<string, unknown>
) {
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

export type InputExercisePluginState = ReturnType<
  typeof createInputExerciseState
>

export interface InputExerciseConfig {
  feedback?: ChildStateTypeConfig
}

export { InputExerciseType }

export type InputExerciseProps = EditorPluginProps<
  InputExercisePluginState,
  InputExerciseConfig
>

const defaultFeedback = {
  plugin: 'text',
}

export function createInputExercisePlugin({
  feedback = defaultFeedback,
}): EditorPlugin<InputExercisePluginState, InputExerciseConfig> {
  return {
    Component: InputExerciseEditor,
    config: { feedback },
    state: createInputExerciseState(feedback),
  }
}
