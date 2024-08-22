import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

import { SpoilerEditor } from './editor'
import {
  child,
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  optional,
} from '../../plugin'

function createSpoilerState(allowedPlugins: EditorPluginType[]) {
  return object({
    title: optional(string('')),
    richTitle: optional(
      child({
        plugin: EditorPluginType.Text,
        config: { noLinebreaks: true },
      })
    ),
    content: child({
      plugin: EditorPluginType.Rows,
      config: {
        allowedPlugins,
      },
    }),
  })
}

const possiblePlugins: EditorPluginType[] = [
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
  EditorPluginType.Exercise,
  EditorPluginType.EdusharingAsset,

  EditorPluginType.DropzoneImage,
  EditorPluginType.H5p,
  EditorPluginType.InputExercise,
  EditorPluginType.ScMcExercise,
  EditorPluginType.BlanksExercise,
]

export function createSpoilerPlugin(
  plugins: (EditorPluginType | TemplatePluginType)[]
): EditorPlugin<SpoilerPluginState> {
  const allowedPlugins = possiblePlugins.filter((pluginType) =>
    plugins.includes(pluginType)
  )

  return {
    Component: SpoilerEditor,
    state: createSpoilerState(allowedPlugins),
    config: {
      allowedPlugins,
    },
  }
}

export interface SpoilerConfig {
  allowedPlugins?: EditorPluginType[]
}

export type SpoilerPluginState = ReturnType<typeof createSpoilerState>

export type SpoilerProps = EditorPluginProps<SpoilerPluginState>
