import {
  child,
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  upload,
} from '@editor/plugin'
import { videoPlugin } from '@editor/plugins/video'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { EntityTitleInput } from './common/entity-title-input'

export const videoTypeState = object({
  url: upload(''),
  title: string(),
  content: child({ plugin: EditorPluginType.Rows }),
})

export type VideoTypePluginState = typeof videoTypeState

export const videoTypePlugin: EditorPlugin<VideoTypePluginState> = {
  Component: VideoTypeEditor,
  state: videoTypeState,
  config: {},
}

function VideoTypeEditor(props: EditorPluginProps<VideoTypePluginState>) {
  const { title, url, content } = props.state

  return (
    <>
      <EntityTitleInput title={title} />

      <article>
        <videoPlugin.Component {...props} state={{ src: url, alt: title }} />
        {content.render()}
      </article>
    </>
  )
}
