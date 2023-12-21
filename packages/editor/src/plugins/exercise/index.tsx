import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
  optional,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { ExerciseEditor } from './editor'

const exerciseState = object({
  content: child({ plugin: EditorPluginType.Rows }),
  interactive: optional(
    child<
      | EditorPluginType.ScMcExercise
      | EditorPluginType.InputExercise
      | EditorPluginType.TextAreaExercise
      | EditorPluginType.H5p
      | EditorPluginType.FillInTheBlanksExercise
    >({
      plugin: EditorPluginType.ScMcExercise,
    })
  ),
  solution: optional(child({ plugin: EditorPluginType.Solution })),
})

export type ExercisePluginState = typeof exerciseState
export type ExerciseProps = EditorPluginProps<ExercisePluginState>

export const exercisePlugin: EditorPlugin<ExercisePluginState> = {
  Component: ExerciseEditor,
  state: exerciseState,
  config: {},
}
