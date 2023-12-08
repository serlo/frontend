import { VideoEditor } from './editor'
import { parseVideoUrl } from './renderer'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
} from '../../plugin'

const videoState = object({ src: string(), alt: string() })

export type VideoProps = EditorPluginProps<VideoPluginState>
export type VideoPluginState = typeof videoState

export const videoPlugin: EditorPlugin<VideoPluginState> = {
  Component: VideoEditor,
  config: {},
  state: videoState,
  onText(value) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [src, type] = parseVideoUrl(value)
    if (type) return { state: { src: value, alt: '' } }
  },
}
