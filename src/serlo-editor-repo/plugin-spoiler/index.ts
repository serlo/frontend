import {
  child,
  ChildStateType,
  ChildStateTypeConfig,
  EditorPlugin,
  EditorPluginProps,
  object,
  ObjectStateType,
  string,
  StringStateType,
} from '../plugin'
import { DeepPartial } from '../ui'
import { SpoilerEditor } from './editor'

/**
 * @param config - {@link SpoilerConfig | Plugin configuration}
 * @public
 */ export function createSpoilerPlugin(
  config: SpoilerConfig
): EditorPlugin<SpoilerPluginState, SpoilerConfig> {
  const { content } = config

  return {
    Component: SpoilerEditor,
    config,
    state: object({
      title: string(''),
      content: child(content),
    }),
  }
}

/** @public */
export interface SpoilerConfig {
  content: ChildStateTypeConfig
  i18n?: DeepPartial<SpoilerPluginConfig['i18n']>
}

/** @public */
export type SpoilerPluginState = ObjectStateType<{
  title: StringStateType
  content: ChildStateType
}>

/** @public */
export interface SpoilerPluginConfig {
  i18n: {
    title: {
      placeholder: string
    }
  }
}

/** @public */
export type SpoilerProps = EditorPluginProps<SpoilerPluginState, SpoilerConfig>
