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
import { DeepPartial } from '../../ui'
import { MultimediaExplanationEditor } from './editor'

/**
 * @param config - {@link MultimediaExplanationConfig | Plugin configuration}
 */
export function createMultimediaExplanationPlugin(
  config: MultimediaExplanationConfig
): EditorPlugin<MultimediaExplanationPluginState, MultimediaExplanationConfig> {
  const { plugins, explanation } = config

  return {
    Component: MultimediaExplanationEditor,
    config,
    state: object({
      explanation: child(explanation),
      multimedia: child({ plugin: plugins[0].name }),
      illustrating: boolean(true),
      width: number(50), // percent
    }),
  }
}

export interface MultimediaExplanationConfig
  extends Omit<MultimediaExplanationPluginConfig, 'features' | 'i18n'> {
  explanation: ChildStateTypeConfig
  i18n?: DeepPartial<MultimediaExplanationPluginConfig['i18n']>
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
  plugins: {
    name: string
    title: string
  }[]
  i18n: {
    changeMultimediaType: string
    reset: string
    illustrating: {
      label: string
      values: {
        illustrating: string
        explaining: string
      }
    }
  }
  features: {
    importance: boolean
  }
}

export type MultimediaExplanationProps = EditorPluginProps<
  MultimediaExplanationPluginState,
  MultimediaExplanationConfig
>
