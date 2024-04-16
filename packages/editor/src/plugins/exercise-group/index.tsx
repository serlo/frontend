import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  list,
  object,
  boolean,
  optional,
  number,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { ExeriseGroupEditor } from './editor/editor'

const allowedPluginsIntermediateTasks = [
  EditorPluginType.Text,
  EditorPluginType.Image,
  EditorPluginType.Multimedia,
  EditorPluginType.Box,
  EditorPluginType.Spoiler,
]

const exerciseGroupState = object({
  content: child({ plugin: EditorPluginType.Rows }),
  exercises: list(child({ plugin: EditorPluginType.Exercise })),
  intermediateTasks: optional(
    list(
      object({
        afterIndex: number(), // insert after this exercise index
        content: child({
          plugin: EditorPluginType.Rows,
          config: {
            allowedPlugins: allowedPluginsIntermediateTasks,
          },
        }),
      })
    )
  ),
})

export type ExerciseGroupPluginState = typeof exerciseGroupState
export type ExerciseGroupProps = EditorPluginProps<ExerciseGroupPluginState>

export const exerciseGroupPlugin: EditorPlugin<ExerciseGroupPluginState> = {
  Component: ExeriseGroupEditor,
  state: exerciseGroupState,
  config: {},
}
