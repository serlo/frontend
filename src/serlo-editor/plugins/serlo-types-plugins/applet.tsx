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

export const appletTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(),
    meta_title: string(),
    meta_description: string(),
    url: serializedChild('geogebra'),
  },
  {}
)

export const appletTypePlugin: EditorPlugin<typeof appletTypeState> = {
  Component: AppletTypeEditor,
  state: appletTypeState,
  config: {},
}

function AppletTypeEditor(props: EditorPluginProps<typeof appletTypeState>) {
  const { title, url, content, meta_title, meta_description } = props.state
  const editorStrings = useEditorStrings()

  return (
    <div>
      <div className="page-header">
        {props.renderIntoToolbar(
          <ContentLoaders
            id={props.state.id.value}
            currentRevision={props.state.revision.value}
            onSwitchRevision={props.state.replaceOwnState}
            entityType={UuidType.Applet}
          />
        )}
        {props.renderIntoSettings(
          <Settings>
            <Settings.Textarea
              label={editorStrings.applet.seoTitle}
              state={meta_title}
            />
            <Settings.Textarea
              label={editorStrings.applet.seoDesc}
              state={meta_description}
            />
          </Settings>
        )}
        <h1>
          {props.editable ? (
            <input
              className={headerInputClasses}
              placeholder={editorStrings.applet.title}
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
        {url.render()}
        {content.render()}
      </article>
      <ToolbarMain showSubscriptionOptions {...props.state} />
    </div>
  )
}
