import { ExerciseEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
  optional,
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const exerciseState = object({
  content: child({ plugin: EditorPluginType.Rows }),
  interactive: optional(
    child<
      | EditorPluginType.ScMcExercise
      | EditorPluginType.InputExercise
      | EditorPluginType.H5p
      | EditorPluginType.FillInTheBlanksExercise
    >({
      plugin: EditorPluginType.ScMcExercise,
    })
  ),
})

export type ExercisePluginState = typeof exerciseState
export type ExerciseProps = EditorPluginProps<ExercisePluginState>

export const exercisePlugin: EditorPlugin<ExercisePluginState> = {
  Component: ExerciseEditor,
  state: exerciseState,
  config: {},
}
