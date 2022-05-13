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
    'table',
    'serloTable',
  ])

  return object({
    type: string(''),
    title: child({
      plugin: 'text',
      config: {
        plugins: {
          code: true,
          colors: false,
          headings: false,
          katex: true,
          links: false,
          lists: false,
          math: true,
          paragraphs: false,
          richText: false,
          suggestions: false,
        },
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
