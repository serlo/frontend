import { entity, editorContent, HeaderInput, entityType } from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { EditorPlugin, EditorPluginProps, string } from '@/serlo-editor/plugin'
import { createVideoPlugin } from '@/serlo-editor/plugins/video'

export const videoTypeState = entityType(
  {
    ...entity,
    content: string(),
    title: string(),
    description: editorContent(),
  },
  {}
)

const videoPlugin = createVideoPlugin()

export const videoTypePlugin: EditorPlugin<typeof videoTypeState> = {
  Component: VideoTypeEditor,
  state: videoTypeState,
  config: {},
}

function VideoTypeEditor(props: EditorPluginProps<typeof videoTypeState>) {
  const { title, description } = props.state
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <section>
      {props.renderIntoToolbar(
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.Video}
        />
      )}
      <div className="page-header">
        <h1>
          {props.editable ? (
            <HeaderInput
              placeholder={editorStrings.video.title}
              value={title.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                title.set(e.target.value)
              }}
            />
          ) : (
            <span itemProp="name">{title.value}</span>
          )}
        </h1>
      </div>
      <article>
        <section>
          <videoPlugin.Component
            {...props}
            state={{
              src: props.state.content,
              alt: props.state.title,
            }}
          />
        </section>
        <section>{description.render()}</section>
      </article>
      <ToolbarMain showSubscriptionOptions {...props.state} />
    </section>
  )
}
