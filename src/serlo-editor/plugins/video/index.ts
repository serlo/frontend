import {
  EditorPlugin,
  EditorPluginProps,
  object,
  ObjectStateType,
  string,
  StringStateType,
} from '../../plugin'
import { VideoEditor } from './editor'
import { parseVideoUrl } from './renderer'

export type VideoPluginState = ObjectStateType<{
  src: StringStateType
  alt: StringStateType
}>

export type VideoProps = EditorPluginProps<VideoPluginState>

export const videoPlugin: EditorPlugin<VideoPluginState> = {
  Component: VideoEditor,
  config: {},
  state: object({ src: string(), alt: string() }),
  onText(value) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [src, type] = parseVideoUrl(value)
    if (type) return { state: { src: value, alt: '' } }
  },
}
