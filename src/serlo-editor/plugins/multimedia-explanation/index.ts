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
import { MultimediaExplanationEditor } from './editor'

const defaultConfig: MultimediaExplanationConfig = {
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

export function createMultimediaExplanationPlugin(
  config = defaultConfig
): EditorPlugin<MultimediaExplanationPluginState, MultimediaExplanationConfig> {
  const { plugins, explanation } = config

  return {
    Component: MultimediaExplanationEditor,
    config,
    state: object({
      explanation: child(explanation),
      multimedia: child({ plugin: plugins[0] }),
      illustrating: boolean(true),
      width: number(50), // percent
    }),
  }
}

export interface MultimediaExplanationConfig
  extends Omit<MultimediaExplanationPluginConfig, 'features'> {
  explanation: ChildStateTypeConfig
  features?: {
    importance?: boolean
  }
}

export type MultimediaExplanationPluginState = ObjectStateType<{
  explanation: ChildStateType
  multimedia: ChildStateType
  illustrating: BooleanStateType
  width: NumberStateType
}>

export interface MultimediaExplanationPluginConfig {
  plugins: string[]
  features: {
    importance: boolean
  }
}

export type MultimediaExplanationProps = EditorPluginProps<
  MultimediaExplanationPluginState,
  MultimediaExplanationConfig
>
