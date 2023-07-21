import {
  entity,
  editorContent,
  serializedChild,
  entityType,
  headerInputClasses,
} from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { Settings } from './helpers/settings'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { EditorPlugin, EditorPluginProps, string } from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const appletTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(),
    meta_title: string(),
    meta_description: string(),
    url: serializedChild(EditorPluginType.Geogebra),
  },
  {}
)

export type AppletTypePluginState = typeof appletTypeState

export const appletTypePlugin: EditorPlugin<AppletTypePluginState> = {
  Component: AppletTypeEditor,
  state: appletTypeState,
  config: {},
}

function AppletTypeEditor(props: EditorPluginProps<AppletTypePluginState>) {
  const {
    title,
    url,
    content,
    meta_title,
    meta_description,
    id,
    revision,
    replaceOwnState,
  } = props.state
  const appletStrings = useEditorStrings().templatePlugins.applet

  return (
    <>
      <h1 className="serlo-h1">
        {props.editable ? (
          <input
            className={headerInputClasses}
            placeholder={appletStrings.placeholder}
            value={title.value}
            onChange={(e) => title.set(e.target.value)}
          />
        ) : (
          <span itemProp="name">{title.value}</span>
        )}
      </h1>

      {url.render()}
      {content.render()}

      <ToolbarMain showSubscriptionOptions {...props.state} />
      {props.renderIntoSideToolbar(
        <ContentLoaders
          id={id.value}
          currentRevision={revision.value}
          onSwitchRevision={replaceOwnState}
          entityType={UuidType.Applet}
        />
      )}
      {props.renderIntoOldSettings(
        <Settings>
          <Settings.Textarea
            label={appletStrings.seoTitle}
            state={meta_title}
          />
          <Settings.Textarea
            label={appletStrings.seoDesc}
            state={meta_description}
          />
        </Settings>
      )}
    </>
  )
}
