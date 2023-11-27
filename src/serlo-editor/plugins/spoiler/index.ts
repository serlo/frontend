import { SpoilerEditor } from './editor'
import {
  child,
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
} from '../../plugin'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

function createSpoilerState(config: SpoilerConfig) {
  return object({
    title: string(''),
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

export const defaultConfig: SpoilerConfig = {}

export function createSpoilerPlugin(
  config = defaultConfig
): EditorPlugin<SpoilerPluginState> {
  return {
    Component: SpoilerEditor,
    state: createSpoilerState(config),
    config: {},
  }
}

export interface SpoilerConfig {
  allowedPlugins?: (EditorPluginType | string)[]
}

export type SpoilerPluginState = ReturnType<typeof createSpoilerState>

export type SpoilerProps = EditorPluginProps<SpoilerPluginState>
