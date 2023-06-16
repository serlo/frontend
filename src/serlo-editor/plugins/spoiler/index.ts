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

const defaultContent = { plugin: 'rows' }

export function createSpoilerPlugin(
  config: SpoilerConfig
): EditorPlugin<SpoilerPluginState, SpoilerConfig> {
  const { content = defaultContent } = config

  return {
    Component: SpoilerEditor,
    config,
    state: object({
      title: string(''),
      content: child(content),
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
