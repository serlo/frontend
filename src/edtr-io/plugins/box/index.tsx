import {
  child,
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '@edtr-io/plugin'

import { BoxRenderer } from './renderer'
import { LoggedInData } from '@/data-types'
import { getPluginRegistry } from '@/edtr-io/get-plugin-registry'

export function createBoxState(
  editorStrings: LoggedInData['strings']['editor']
) {
  const plugins = getPluginRegistry('box', editorStrings, [
    'text',
    'image',
    'equations',
    'multimedia',
    'serloTable',
    'highlight',
  ])

  return object({
    type: string(''),
    title: child({
      plugin: 'text',
      config: {
        formattingOptions: ['code', 'katex', 'math'],
        noLinebreaks: true,
      },
    }),
    anchorId: string(''),
    content: child({
      plugin: 'rows',
      config: {
        plugins,
      },
    }),
  })
}

export type BoxPluginState = ReturnType<typeof createBoxState>
export type BoxProps = EditorPluginProps<BoxPluginState>

export function createBoxPlugin(
  editorStrings: LoggedInData['strings']['editor']
): EditorPlugin<BoxPluginState> {
  return {
    Component: BoxRenderer,
    config: {},
    state: createBoxState(editorStrings),
  }
}
