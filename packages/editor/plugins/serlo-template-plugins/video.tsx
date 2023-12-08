import {
  entity,
  editorContent,
  entityType,
  headerInputClasses,
} from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@/serlo-editor/plugin'
import { videoPlugin } from '@/serlo-editor/plugins/video'

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
  const editorStrings = useEditorStrings()

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
      <h1 className="serlo-h1 mt-32">
        <input
          autoFocus
          className={headerInputClasses}
          placeholder={editorStrings.plugins.video.titlePlaceholder}
          value={title.value}
          onChange={(e) => title.set(e.target.value)}
        />
      </h1>
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
