import { EditorPlugin, EditorPluginProps, string } from '@edtr-io/plugin'

import { editorContent, entity, HeaderInput, entityType } from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { Settings } from './helpers/settings'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'

export const eventTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(),
    meta_title: string(),
    meta_description: string(),
  },
  {}
)

export const eventTypePlugin: EditorPlugin<typeof eventTypeState> = {
  Component: EventTypeEditor,
  state: eventTypeState,
  config: {},
}

function EventTypeEditor(props: EditorPluginProps<typeof eventTypeState>) {
  const { content, title, meta_title, meta_description } = props.state
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <>
      <div className="page-header">
        {props.renderIntoToolbar(
          <ContentLoaders
            id={props.state.id.value}
            currentRevision={props.state.revision.value}
            onSwitchRevision={props.state.replaceOwnState}
            entityType={UuidType.Event}
          />
        )}
        {props.renderIntoSettings(
          <Settings>
            <Settings.Textarea
              label={editorStrings.event.seoTitle}
              state={meta_title}
            />
            <Settings.Textarea
              label={editorStrings.event.seoDesc}
              state={meta_description}
            />
          </Settings>
        )}
        <h1>
          {props.editable ? (
            <HeaderInput
              placeholder={editorStrings.event.title}
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
      <article>{content.render()}</article>
      <ToolbarMain showSubscriptionOptions {...props.state} />
    </>
  )
}
