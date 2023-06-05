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
  editorStrings: LoggedInData['strings']['editor'],
  allowPluginsWithin: string[]
) {
  const plugins = getPluginRegistry('box', editorStrings, allowPluginsWithin)

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

export function createBoxPlugin({
  editorStrings,
  allowPluginsWithin = [
    'text',
    'image',
    'equations',
    'multimedia',
    'serloTable',
    'highlight',
  ],
}: {
  editorStrings: LoggedInData['strings']['editor']
  allowPluginsWithin?: string[] // Used in https://github.com/serlo/serlo-editor-for-edusharing
}): EditorPlugin<BoxPluginState> {
  return {
    Component: BoxRenderer,
    config: {},
    state: createBoxState(editorStrings, allowPluginsWithin),
  }
}
