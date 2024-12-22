import { AudioEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  upload,
} from '../../plugin'

const audioState = object({ source: upload('') })

export type AudioProps = EditorPluginProps<AudioPluginState>
export type AudioPluginState = typeof audioState

export const audioPlugin: EditorPlugin<AudioPluginState> = {
  Component: AudioEditor,
  config: {},
  state: audioState,
}
