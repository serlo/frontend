import { BoxEditor } from './editor'
import type { LoggedInData } from '@/data-types'
import { getPluginRegistry } from '@/serlo-editor-integration/get-plugin-registry'
import {
  child,
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '@/serlo-editor/plugin'

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
    Component: BoxEditor,
    config: {},
    state: createBoxState(editorStrings, allowPluginsWithin),
  }
}
