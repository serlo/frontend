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
} from '../../plugin'
import { SpoilerEditor } from './editor'

const defaultConfig: SpoilerConfig = {
  content: { plugin: 'rows' },
}

export function createSpoilerPlugin(
  config = defaultConfig
): EditorPlugin<SpoilerPluginState, SpoilerConfig> {
  const { content } = config

  return {
    Component: SpoilerEditor,
    config,
    state: object({
      title: string(''),
      content: child(content!),
    }),
  }
}

export interface SpoilerConfig {
  content?: ChildStateTypeConfig
}

export type SpoilerPluginState = ObjectStateType<{
  title: StringStateType
  content: ChildStateType
}>

export type SpoilerProps = EditorPluginProps<SpoilerPluginState, SpoilerConfig>
