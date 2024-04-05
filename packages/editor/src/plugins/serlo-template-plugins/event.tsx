import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { UuidType } from '@serlo/frontend/src/data-types'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'

import {
  editorContent,
  entity,
  entityType,
  headerInputClasses,
} from './common/common'
import { ToolbarMain } from './toolbar-main/toolbar-main'

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

export type EventTypePluginState = typeof eventTypeState

export const eventTypePlugin: EditorPlugin<EventTypePluginState> = {
  Component: EventTypeEditor,
  state: eventTypeState,
  config: {},
}

function EventTypeEditor(props: EditorPluginProps<EventTypePluginState>) {
  const { content, title, id, revision, replaceOwnState } = props.state
  const placeholder = useEditorStrings().templatePlugins.event.title

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
      <h1 className="serlo-h1 mt-20">
        <input
          autoFocus
          className={headerInputClasses}
          placeholder={placeholder}
          value={title.value}
          onChange={(e) => title.set(e.target.value)}
        />
      </h1>

      {content.render()}

      <ToolbarMain showSubscriptionOptions {...props.state} />
    </>
  )
}
