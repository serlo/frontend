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
} from '../plugin'
import { DeepPartial } from '../ui'
import { ScMcExerciseEditor } from './editor'

/**
 * @param config - {@link ScMcExerciseConfig | Plugin configuration}
 */
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

export interface ScMcExerciseConfig
  extends Omit<ScMcExercisePluginConfig, 'i18n'> {
  content: ChildStateTypeConfig
  feedback: ChildStateTypeConfig
  i18n?: DeepPartial<ScMcExercisePluginConfig['i18n']>
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

export interface ScMcExercisePluginConfig {
  i18n: {
    types: { singleChoice: string; multipleChoice: string }
    answer: {
      label: string
      addLabel: string
      fallbackFeedback: { wrong: string }
    }
    feedback: { label: string }
    globalFeedback: {
      correct: string
      missingCorrectAnswers: string
      wrong: string
    }
    isSingleChoice: { label: string }
  }
}

export type ScMcExerciseProps = EditorPluginProps<
  ScMcExercisePluginState,
  ScMcExerciseConfig
>
