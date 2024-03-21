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

import { ExeriseGroupEditor } from './editor'

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
  /* cohesive field would indicate whether the children of a grouped exercise are cohesive
    this field might be used in the future, but currently it has no effect and can not be changed
    */
  cohesive: boolean(false),
})

export type ExerciseGroupPluginState = typeof exerciseGroupState
export type ExerciseGroupProps = EditorPluginProps<ExerciseGroupPluginState>

export const exerciseGroupPlugin: EditorPlugin<ExerciseGroupPluginState> = {
  Component: ExeriseGroupEditor,
  state: exerciseGroupState,
  config: {},
}
