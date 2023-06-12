import {
  EditorPlugin,
  EditorPluginProps,
  string,
  StringStateType,
} from '../../plugin'
import { AnchorEditor } from './editor'

// will probably be replaced. refactoring not necessary

export function createAnchorPlugin(): EditorPlugin<AnchorPluginState> {
  return {
    Component: AnchorEditor,
    config: {},
    state: string(),
  }
}

export type AnchorPluginState = StringStateType
export type AnchorProps = EditorPluginProps<AnchorPluginState>
