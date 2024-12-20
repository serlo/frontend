import { VideoEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  upload,
} from '../../plugin'
import { isValidVideoUrl } from './utils/is-valid-video-url'

const videoState = object({ src: upload(''), alt: string() })

export type VideoProps = EditorPluginProps<VideoPluginState>
export type VideoPluginState = typeof videoState

export const videoPlugin: EditorPlugin<VideoPluginState> = {
  Component: VideoEditor,
  config: {},
  state: videoState,
  onText(value) {
    if (isValidVideoUrl(value)) return { state: { src: value, alt: '' } }
  },
}
