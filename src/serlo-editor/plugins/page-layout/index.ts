import { PageLayoutEditor } from './editor'
import {
  EditorPlugin,
  number,
  object,
  child,
  EditorPluginProps,
} from '@/serlo-editor/plugin'

const allowedPlugins = [
  'text',
  'blockquote',
  'box',
  'geogebra',
  'highlight',
  'anchor',
  'equations',
  'image',
  'important',
  'injection',
  'multimedia',
  'spoiler',
  'serloTable',
  'video',
]

export const pageLayoutState = object({
  widthPercent: number(), // first column defines second
  column1: child({
    plugin: 'rows',
    config: {
      allowedPlugins,
    },
  }),
  column2: child({
    plugin: 'rows',
    config: {
      allowedPlugins,
    },
  }),
})

export type PageLayoutPluginState = typeof pageLayoutState
export type PageLayoutPluginProps = EditorPluginProps<PageLayoutPluginState>

export const pageLayoutPlugin: EditorPlugin<PageLayoutPluginState> = {
  Component: PageLayoutEditor,
  config: {},
  state: pageLayoutState,
}
