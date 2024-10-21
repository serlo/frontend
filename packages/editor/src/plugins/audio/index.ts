import { AudioEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
} from '../../plugin'

const audioState = object({ src: string() })

export type AudioProps = EditorPluginProps<AudioPluginState>
export type AudioPluginState = typeof audioState

export const audioPlugin: EditorPlugin<AudioPluginState> = {
  Component: AudioEditor,
  config: {},
  state: audioState,
}
