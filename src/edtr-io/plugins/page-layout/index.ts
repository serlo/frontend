import {
  EditorPlugin,
  number,
  object,
  EditorPluginProps,
  child,
} from '@edtr-io/plugin'

import { PageLayoutEditor } from './editor'
import { LoggedInData } from '@/data-types'
import { getPluginRegistry } from '@/edtr-io/get-plugin-registry'

export function createPageLayoutState(
  editorStrings: LoggedInData['strings']['editor']
) {
  const plugins = getPluginRegistry('box', editorStrings, [
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
    'table',
    'serloTable',
    'video',
  ])

  return object({
    widthPercent: number(), // first column defines second
    column1: child({
      plugin: 'rows',
      config: {
        plugins,
      },
    }),
    column2: child({
      plugin: 'rows',
      config: {
        plugins,
      },
    }),
  })
}

export type PageLayoutPluginState = ReturnType<typeof createPageLayoutState>
export type PageLayoutPluginProps = EditorPluginProps<PageLayoutPluginState>

export function createPageLayoutPlugin(
  editorStrings: LoggedInData['strings']['editor']
): EditorPlugin<PageLayoutPluginState> {
  return {
    Component: PageLayoutEditor,
    config: {},
    state: createPageLayoutState(editorStrings),
  }
}
