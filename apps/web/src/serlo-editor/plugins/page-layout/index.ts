import { PageLayoutEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  number,
  object,
  child,
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

const allowedPlugins = [
  EditorPluginType.Text,
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
