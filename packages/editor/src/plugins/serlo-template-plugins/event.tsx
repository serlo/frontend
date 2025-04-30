import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
} from '@editor/plugin'

import { editorContent } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'

export const eventTypeState = object({
  title: string(),
  content: editorContent(),
})

export type EventTypePluginState = typeof eventTypeState

export const eventTypePlugin: EditorPlugin<EventTypePluginState> = {
  Component: EventTypeEditor,
  state: eventTypeState,
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
