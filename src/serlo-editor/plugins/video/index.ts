import {
  EditorPlugin,
  EditorPluginProps,
  object,
  ObjectStateType,
  string,
  StringStateType,
} from '../../plugin'
import { DeepPartial } from '../../ui'
import { VideoEditor } from './editor'

/**
 * @param config - {@link VideoConfig | Plugin configuration}
 */ export function createVideoPlugin(
  config: VideoConfig = {}
): EditorPlugin<VideoPluginState, VideoConfig> {
  return {
    Component: VideoEditor,
    config,
    state: object({ src: string(), alt: string() }),
    onText(value) {
      const regex =
        /^(https?:\/\/)?(.*?(youtube\.com\/watch\?(.*&)?v=.+|youtu\.be\/.+|vimeo\.com\/.+|upload\.wikimedia\.org\/.+(\.webm|\.ogg)?|br\.de\/.+))/
      if (regex.test(value)) {
        return { state: { src: value, alt: '' } }
      }
    },
  }
}

export interface VideoConfig {
  i18n?: DeepPartial<VideoPluginConfig['i18n']>
}

export type VideoPluginState = ObjectStateType<{
  src: StringStateType
  alt: StringStateType
}>

export interface VideoPluginConfig {
  i18n: {
    src: {
      label: string
    }
    alt: {
      label: string
    }
  }
}

export type VideoProps = EditorPluginProps<VideoPluginState, VideoConfig>
