import {
  type EditorPlugin,
  type EditorPluginProps,
  number,
  object,
  child,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { PageLayoutEditor } from './editor'

const allowedPlugins = [
  EditorPluginType.Text,
  EditorPluginType.BlanksTable,
  EditorPluginType.Box,
  EditorPluginType.Geogebra,
  EditorPluginType.Highlight,
  EditorPluginType.Anchor,
  EditorPluginType.Equations,
  EditorPluginType.Image,
  EditorPluginType.Injection,
  EditorPluginType.Multimedia,
  EditorPluginType.Spoiler,
  EditorPluginType.SerloTable,
  EditorPluginType.Video,
]

const pageLayoutState = object({
  widthPercent: number(), // first column defines second
  column1: child({
    plugin: EditorPluginType.Rows,
    config: { allowedPlugins },
  }),
  column2: child({
    plugin: EditorPluginType.Rows,
    config: { allowedPlugins },
  }),
})

export type PageLayoutPluginState = typeof pageLayoutState
export type PageLayoutPluginProps = EditorPluginProps<PageLayoutPluginState>

export const pageLayoutPlugin: EditorPlugin<PageLayoutPluginState> = {
  Component: PageLayoutEditor,
  config: {},
  state: pageLayoutState,
}
