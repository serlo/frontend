import { AnchorEditor } from './editor'
import {
  EditorPlugin,
  EditorPluginProps,
  string,
  StringStateType,
} from '../../plugin'

// will probably be replaced. refactoring not necessary

export type AnchorPluginState = StringStateType
export type AnchorProps = EditorPluginProps<AnchorPluginState>

export const anchorPlugin: EditorPlugin<AnchorPluginState> = {
  Component: AnchorEditor,
  config: {},
  state: string(),
}
