import { AudioEditor } from './editor'
import { parseAudioUrl } from './renderer'
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
  onText(value) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [src, type] = parseAudioUrl(value)
    if (type)
      return {
        state: {
          src,
        },
      }
  },
}
