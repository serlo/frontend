import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { UuidType } from '@serlo/frontend/src/data-types'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'

import { editorContent, entity, entityType } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'
import { ToolbarMain } from './toolbar-main/toolbar-main'

export const eventTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(),
  },
  {}
)

export type EventTypePluginState = typeof eventTypeState

export const eventTypePlugin: EditorPlugin<EventTypePluginState> = {
  Component: EventTypeEditor,
  state: eventTypeState,
  config: {},
}

function EventTypeEditor(props: EditorPluginProps<EventTypePluginState>) {
  const { content, title, id, revision, replaceOwnState } = props.state

  return (
    <>
      <div className="absolute right-0 -mt-10 mr-side flex">
        <ContentLoaders
          id={id.value}
          currentRevision={revision.value}
          onSwitchRevision={replaceOwnState}
          entityType={UuidType.Event}
        />
      </div>
      <EntityTitleInput title={title} />

      {content.render()}

      <ToolbarMain showSubscriptionOptions {...props.state} />
    </>
  )
}
