import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'

import { editorContent, entity, entityType } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'

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
  const { content, title } = props.state

  return (
    <>
      <EntityTitleInput title={title} />
      {content.render()}
    </>
  )
}
