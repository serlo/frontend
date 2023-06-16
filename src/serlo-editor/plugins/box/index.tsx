import { BoxEditor } from './editor'
import {
  child,
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '@/serlo-editor/plugin'

export function createBoxState(allowedPlugins: string[]) {
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
        allowedPlugins,
      },
    }),
  })
}

export type BoxPluginState = ReturnType<typeof createBoxState>
export type BoxProps = EditorPluginProps<BoxPluginState>
export interface BoxConfig {
  allowedPlugins?: string[]
}

const defaultAllowedPlugins = [
  'text',
  'image',
  'equations',
  'multimedia',
  'serloTable',
  'highlight',
]

export function createBoxPlugin({
  allowedPlugins = defaultAllowedPlugins,
}): EditorPlugin<BoxPluginState> {
  return {
    Component: BoxEditor,
    state: createBoxState(allowedPlugins),
    config: {},
  }
}
