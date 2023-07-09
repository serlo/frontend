import {
  boolean,
  child,
  ChildStateTypeConfig,
  EditorPlugin,
  EditorPluginProps,
  number,
  object,
} from '../../plugin'
import { MultimediaEditor } from './editor'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const defaultConfig: MultimediaConfig = {
  allowedPlugins: ['image', 'video', 'geogebra'],
  explanation: {
    plugin: 'rows',
    config: {
      allowedPlugins: [
        EditorPluginType.Text,
        EditorPluginType.Highlight,
        EditorPluginType.Anchor,
        EditorPluginType.Equations,
        EditorPluginType.Image,
        EditorPluginType.SerloTable,
      ],
    },
  },
}

function createMultimediaState(config: MultimediaConfig) {
  const { allowedPlugins, explanation } = config
  return object({
    explanation: child(explanation),
    multimedia: child({ plugin: allowedPlugins[0] }),
    illustrating: boolean(true),
    width: number(50), // percent
  })
}

export function createMultimediaPlugin(
  config = defaultConfig
): EditorPlugin<MultimediaPluginState, MultimediaConfig> {
  return {
    Component: MultimediaEditor,
    config,
    state: createMultimediaState(config),
  }
}

export type MultimediaPluginState = ReturnType<typeof createMultimediaState>

export interface MultimediaConfig {
  allowedPlugins: string[]
  explanation: ChildStateTypeConfig
}

export type MultimediaProps = EditorPluginProps<
  MultimediaPluginState,
  MultimediaConfig
>
