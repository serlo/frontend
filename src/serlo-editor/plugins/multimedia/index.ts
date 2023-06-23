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

const defaultConfig: MultimediaConfig = {
  explanation: {
    plugin: 'rows',
    config: {
      allowedPlugins: [
        'text',
        'highlight',
        'anchor',
        'equations',
        'image',
        'serloTable',
      ],
    },
  },
  plugins: ['image', 'video', 'geogebra'],
}

function createMultimediaState(config: MultimediaConfig) {
  const { plugins, explanation } = config
  return object({
    explanation: child(explanation),
    multimedia: child({ plugin: plugins[0] }),
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

export interface MultimediaConfig
  extends Omit<MultimediaPluginConfig, 'features'> {
  explanation: ChildStateTypeConfig
  features?: {
    importance?: boolean
  }
}

export type MultimediaPluginState = ReturnType<typeof createMultimediaState>

export interface MultimediaPluginConfig {
  plugins: string[]
  features: {
    importance: boolean
  }
}

export type MultimediaProps = EditorPluginProps<
  MultimediaPluginState,
  MultimediaConfig
>
