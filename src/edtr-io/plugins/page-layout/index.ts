import {
  EditorPlugin,
  number,
  object,
  EditorPluginProps,
} from '@edtr-io/plugin'

import { editorContent } from '../types/common/common'
import { PageLayoutEditor } from './editor'

export const pageLayoutState = object({
  widthPercent: number(), // first column defined second
  column1: editorContent('rows'),
  column2: editorContent('rows'),
})

export type PageLayoutPluginState = typeof pageLayoutState
export type PageLayoutPluginProps = EditorPluginProps<PageLayoutPluginState>

export const pageLayoutPlugin: EditorPlugin<PageLayoutPluginState> = {
  Component: PageLayoutEditor,
  state: pageLayoutState,
  config: {},
}
