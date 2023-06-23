import {
  boolean,
  BooleanStateType,
  child,
  ChildStateType,
  ChildStateTypeConfig,
  EditorPlugin,
  EditorPluginProps,
  number,
  NumberStateType,
  object,
  ObjectStateType,
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

export function createMultimediaPlugin(
  config = defaultConfig
): EditorPlugin<MultimediaPluginState, MultimediaConfig> {
  const { plugins, explanation } = config
  return {
    Component: MultimediaEditor,
    config,
    state: object({
      explanation: child(explanation),
      multimedia: child({ plugin: plugins[0] }),
      illustrating: boolean(true),
      width: number(50), // percent
    }),
  }
}

export interface MultimediaConfig
  extends Omit<MultimediaPluginConfig, 'features'> {
  explanation: ChildStateTypeConfig
  features?: {
    importance?: boolean
  }
}

export type MultimediaPluginState = ObjectStateType<{
  explanation: ChildStateType
  multimedia: ChildStateType
  illustrating: BooleanStateType
  width: NumberStateType
}>

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
