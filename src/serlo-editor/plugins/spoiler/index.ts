import {
  child,
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '../../plugin'
import { SpoilerEditor } from './editor'

function createSpoilerState(config: SpoilerConfig) {
  return object({
    title: string(''),
    content: child({
      plugin: 'rows',
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
  allowedPlugins?: string[]
}

export type SpoilerPluginState = ReturnType<typeof createSpoilerState>

export type SpoilerProps = EditorPluginProps<SpoilerPluginState>
