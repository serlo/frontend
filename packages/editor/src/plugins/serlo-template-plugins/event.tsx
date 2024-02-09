import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
  child,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { UuidType } from '@serlo/frontend/src/data-types'

import { entity, entityType, headerInputClasses } from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'

export const eventTypeState = entityType(
  {
    ...entity,
    title: string(),
    // content: editorContent(EditorPluginType.Rows),
    content: child({
      plugin: EditorPluginType.Rows,
      config: {
        allowedPlugins: [EditorPluginType.Exercise, EditorPluginType.Rows],
      },
    }),
    meta_title: string(),
    meta_description: string(),
  },
  {}
)

//  content: child({
//       plugin: EditorPluginType.Rows,
//       ...(config.allowedPlugins !== undefined && {
//         config: {
//           allowedPlugins: config.allowedPlugins,
//         },
//       }),
//     }),

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
