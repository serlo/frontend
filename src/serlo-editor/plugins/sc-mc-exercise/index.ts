import { ScMcExerciseEditor } from './editor'
import {
  boolean,
  child,
  EditorPlugin,
  EditorPluginProps,
  list,
  object,
} from '../../plugin'

const scMcExerciseState = object({
  isSingleChoice: boolean(false),
  answers: list(
    object({
      content: child({ plugin: 'text' }),
      isCorrect: boolean(false),
      feedback: child({ plugin: 'text' }),
    })
  ),
})

export type ScMcExerciseProps = EditorPluginProps<ScMcExercisePluginState>
export type ScMcExercisePluginState = typeof scMcExerciseState

export function createScMcExercisePlugin(): EditorPlugin<ScMcExercisePluginState> {
  return {
    Component: ScMcExerciseEditor,
    config: {},
    state: scMcExerciseState,
  }
}
