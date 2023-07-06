import { ExerciseEditor } from './editor'
import {
  EditorPlugin,
  EditorPluginProps,
  child,
  object,
  optional,
} from '@/serlo-editor/plugin'

const exerciseState = object({
  content: child({ plugin: 'rows' }),
  interactive: optional(
    child<'scMcExercise' | 'inputExercise' | 'h5p'>({ plugin: 'scMcExercise' })
  ),
})

export type ExercisePluginState = typeof exerciseState
export type ExerciseProps = EditorPluginProps<ExercisePluginState>

export const exercisePlugin: EditorPlugin<ExercisePluginState> = {
  Component: ExerciseEditor,
  state: exerciseState,
  config: {},
}
