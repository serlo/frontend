import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { videoPlugin } from '@editor/plugins/video'

import { entity, editorContent, entityType } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'

export const videoTypeState = entityType(
  {
    ...entity,
    content: string(),
    title: string(),
    description: editorContent(),
  },
  {}
)

export type VideoTypePluginState = typeof videoTypeState

export const videoTypePlugin: EditorPlugin<VideoTypePluginState> = {
  Component: VideoTypeEditor,
  state: videoTypeState,
  config: {},
}

function VideoTypeEditor(props: EditorPluginProps<VideoTypePluginState>) {
  const { title, content, description } = props.state

  return (
    <>
      <EntityTitleInput title={title} />

      <article>
        <videoPlugin.Component
          {...props}
          state={{ src: content, alt: title }}
        />
        {description.render()}
      </article>
    </>
  )
}
