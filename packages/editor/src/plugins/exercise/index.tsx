import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
  optional,
  number,
  boolean,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { ExerciseEditor } from './editor'
import { InteractivePluginType } from './interactive-plugin-types'

const allowedPlugins = [
  EditorPluginType.Text,
  EditorPluginType.Image,
  EditorPluginType.ImageGallery,
  EditorPluginType.Multimedia,
  EditorPluginType.Spoiler,
  EditorPluginType.Box,
  EditorPluginType.SerloTable,
  EditorPluginType.Injection,
  EditorPluginType.Equations,
  EditorPluginType.Geogebra,
  EditorPluginType.Highlight,
  EditorPluginType.Video,
  EditorPluginType.Audio,
  EditorPluginType.EdusharingAsset,
]

const exerciseState = object({
  content: child({ plugin: EditorPluginType.Rows, config: { allowedPlugins } }),
  interactive: optional(
    child<InteractivePluginType>({
      plugin: EditorPluginType.ScMcExercise,
    })
  ),
  solution: optional(child({ plugin: EditorPluginType.Solution })),
  licenseId: optional(number()),
  hideInteractiveInitially: optional(boolean()),
})

export type ExercisePluginState = typeof exerciseState
export type ExerciseProps = EditorPluginProps<ExercisePluginState>

export const exercisePlugin: EditorPlugin<ExercisePluginState> = {
  Component: ExerciseEditor,
  state: exerciseState,
  config: {},
}
