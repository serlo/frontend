import {
  EditorPlugin,
  EditorPluginProps,
  object,
  ObjectStateType,
  string,
  StringStateType,
} from '../../plugin'
import { VideoEditor } from './editor'

export function createVideoPlugin(): EditorPlugin<VideoPluginState> {
  return {
    Component: VideoEditor,
    config: {},
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

export type VideoPluginState = ObjectStateType<{
  src: StringStateType
  alt: StringStateType
}>

export type VideoProps = EditorPluginProps<VideoPluginState>
