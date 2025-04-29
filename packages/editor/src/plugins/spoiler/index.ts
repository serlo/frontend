import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { SpoilerEditor } from './editor'
import {
  child,
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  optional,
} from '../../plugin'

const spoilerState = object({
  title: optional(string('')),
  richTitle: optional(
    child({
      plugin: EditorPluginType.Text,
      config: { noLinebreaks: true },
    })
  ),
  content: child({ plugin: EditorPluginType.Rows }),
})

export const allowedSpoilerChildren: EditorPluginType[] = [
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
]

export const spoilerPlugin: EditorPlugin<SpoilerPluginState> = {
  Component: SpoilerEditor,
  state: spoilerState,
}

export type SpoilerPluginState = typeof spoilerState
export type SpoilerProps = EditorPluginProps<SpoilerPluginState>
