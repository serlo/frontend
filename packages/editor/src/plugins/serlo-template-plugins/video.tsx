import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { videoPlugin } from '@editor/plugins/video'
import { UuidType } from '@serlo/frontend/src/data-types'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'

import { entity, editorContent, entityType } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'
import { ToolbarMain } from './toolbar-main/toolbar-main'

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
  const { title, content, description, id, revision, replaceOwnState } =
    props.state

  return (
    <>
      <div className="absolute right-0 -mt-20 mr-side">
        <ContentLoaders
          id={id.value}
          currentRevision={revision.value}
          onSwitchRevision={replaceOwnState}
          entityType={UuidType.Video}
        />
      </div>
      <EntityTitleInput title={title} />

      <article>
        <videoPlugin.Component
          {...props}
          state={{ src: content, alt: title }}
        />

        {description.render()}
      </article>
      <ToolbarMain showSubscriptionOptions {...props.state} />
    </>
  )
}
