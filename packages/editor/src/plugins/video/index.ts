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

export type VideoProps = EditorPluginProps<VideoPluginState, VideoConfig>
export type VideoPluginState = typeof videoState
export type VideoConfig = VideoPluginConfig

export function createVideoPlugin(
  config: VideoConfig
): EditorPlugin<VideoPluginState, VideoConfig> {
  return {
    Component: VideoEditor,
    config,
    state: videoState,
    onText(value) {
      if (isValidVideoUrl(value)) return { state: { src: value, alt: '' } }
    },
  }
}

export interface VideoPluginConfig {
  disableFileUpload?: boolean
}
