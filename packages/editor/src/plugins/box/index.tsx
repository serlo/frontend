import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

import { BoxEditor } from './editor'

function createBoxState(allowedPlugins: EditorPluginType[]) {
  return object({
    type: string(''),
    title: child({
      plugin: EditorPluginType.Text,
      config: {
        noLinebreaks: true,
      },
    }),
    // we don't generate new id's any more but keep the old ones for now
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

const possiblePlugins: EditorPluginType[] = [
  EditorPluginType.Text,
  EditorPluginType.Image,
  EditorPluginType.Equations,
  EditorPluginType.Multimedia,
  EditorPluginType.SerloTable,
  EditorPluginType.Highlight,
  EditorPluginType.EdusharingAsset,
]

export function createBoxPlugin(
  plugins: (EditorPluginType | TemplatePluginType)[]
): EditorPlugin<BoxPluginState> {
  const allowedPlugins = possiblePlugins.filter((pluginType) =>
    plugins.includes(pluginType)
  )

  return {
    Component: BoxEditor,
    state: createBoxState(allowedPlugins),
    config: {
      allowedPlugins,
    },
  }
}
