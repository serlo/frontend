import { VideoEditor } from './editor'
import { parseVideoUrl } from './renderer'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  upload,
} from '../../plugin'

const videoState = object({ src: upload(''), alt: string() })

export type VideoProps = EditorPluginProps<VideoPluginState>
export type VideoPluginState = typeof videoState

export const videoPlugin: EditorPlugin<VideoPluginState> = {
  Component: VideoEditor,
  config: {},
  state: videoState,
  onText(value) {
    const [, type] = parseVideoUrl(value)
    if (type) return { state: { src: value, alt: '' } }
  },
}
