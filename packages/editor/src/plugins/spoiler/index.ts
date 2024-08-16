import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { SpoilerEditor } from './editor'
import {
  child,
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  optional,
} from '../../plugin'

function createSpoilerState(config: SpoilerConfig) {
  return object({
    title: optional(string('')),
    richTitle: optional(
      child({
        plugin: EditorPluginType.Text,
        config: { noLinebreaks: true },
      })
    ),
    content: child({
      plugin: EditorPluginType.Rows,
      ...(config.allowedPlugins !== undefined && {
        config: {
          allowedPlugins: config.allowedPlugins,
        },
      }),
    }),
  })
}

const defaultAllowedPlugins: EditorPluginType[] = [
  EditorPluginType.Text,
  EditorPluginType.Image,
  EditorPluginType.Equations,
  EditorPluginType.Multimedia,
  EditorPluginType.SerloTable,
  EditorPluginType.Highlight,
]

export const defaultConfig: SpoilerConfig = {
  allowedPlugins: defaultAllowedPlugins,
}

export function createSpoilerPlugin(
  config = defaultConfig
): EditorPlugin<SpoilerPluginState> {
  return {
    Component: SpoilerEditor,
    state: createSpoilerState(config),
    config,
  }
}

export interface SpoilerConfig {
  allowedPlugins?: EditorPluginType[]
}

export type SpoilerPluginState = ReturnType<typeof createSpoilerState>

export type SpoilerProps = EditorPluginProps<SpoilerPluginState>
