import { ScMcExerciseEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  boolean,
  child,
  list,
  object,
} from '../../plugin'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

const scMcExerciseState = object({
  isSingleChoice: boolean(false),
  answers: list(
    object({
      content: child({ plugin: EditorPluginType.Text }),
      isCorrect: boolean(false),
      feedback: child({ plugin: EditorPluginType.Text }),
    }),
    2
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
