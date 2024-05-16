import { AnchorEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  type StringStateType,
  string,
} from '../../plugin'

// new anchor plugins are not supported
// this is only here to support existing anchor plugins
// and the need for this plugin could be removed with a migration

export type AnchorPluginState = StringStateType
export type AnchorProps = EditorPluginProps<AnchorPluginState>

export const anchorPlugin: EditorPlugin<AnchorPluginState> = {
  Component: AnchorEditor,
  config: {},
  state: string(),
}
