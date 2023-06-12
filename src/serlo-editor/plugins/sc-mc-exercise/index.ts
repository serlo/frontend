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
} from '../../plugin'
import { ScMcExerciseEditor } from './editor'

export type ScMcExerciseProps = EditorPluginProps<
  ScMcExercisePluginState,
  ScMcExerciseConfig
>

export function createScMcExercisePlugin(
  config: ScMcExerciseConfig
): EditorPlugin<ScMcExercisePluginState, ScMcExerciseConfig> {
  const { content, feedback } = config

  return {
    Component: ScMcExerciseEditor,
    config,
    state: createState(),
  }

  function createState(): ScMcExercisePluginState {
    const answerState = object({
      content: child(content),
      isCorrect: boolean(false),
      feedback: child(feedback),
    })

    return object({
      isSingleChoice: boolean(false),
      answers: list(answerState),
    })
  }
}

export interface ScMcExerciseConfig {
  content: ChildStateTypeConfig
  feedback: ChildStateTypeConfig
}

export type ScMcExercisePluginState = ObjectStateType<{
  isSingleChoice: BooleanStateType
  answers: ListStateType<
    ObjectStateType<{
      content: ChildStateType
      isCorrect: BooleanStateType
      feedback: ChildStateType
    }>
  >
}>
