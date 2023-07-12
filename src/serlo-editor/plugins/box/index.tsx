import { BoxEditor } from './editor'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  child,
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '@/serlo-editor/plugin'

function createBoxState(allowedPlugins: (EditorPluginType | string)[]) {
  return object({
    type: string(''),
    title: child({
      plugin: EditorPluginType.Text,
      config: {
        formattingOptions: ['code', 'katex', 'math'],
        noLinebreaks: true,
      },
    }),
    anchorId: string(''),
    content: child({
      plugin: EditorPluginType.Rows,
      config: { allowedPlugins },
    }),
  })
}

export type BoxPluginState = ReturnType<typeof createBoxState>
export type BoxProps = EditorPluginProps<BoxPluginState>
export interface BoxConfig {
  allowedPlugins?: (EditorPluginType | string)[]
}

const defaultAllowedPlugins = [
  EditorPluginType.Text,
  EditorPluginType.Image,
  EditorPluginType.Equations,
  EditorPluginType.Multimedia,
  EditorPluginType.SerloTable,
  EditorPluginType.Highlight,
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
