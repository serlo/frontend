import {
  editorContent,
  entity,
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

export const articleTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(EditorPluginType.Article),
    meta_title: string(),
    meta_description: string(),
  },
  {}
)
type ArticleTypePluginState = typeof articleTypeState

export const articleTypePlugin: EditorPlugin<ArticleTypePluginState> = {
  Component: ArticleTypeEditor,
  state: articleTypeState,
  config: {},
}

function ArticleTypeEditor(props: EditorPluginProps<ArticleTypePluginState>) {
  const { title, content, meta_title, meta_description } = props.state

  const articleStrings = useEditorStrings().templatePlugins.article

  return (
    <>
      <h1 className="serlo-h1" itemProp="name">
        {props.editable ? (
          <input
            className={headerInputClasses}
            placeholder={articleStrings.title}
            value={title.value}
            onChange={(e) => title.set(e.target.value)}
          />
        ) : (
          title.value
        )}
      </h1>

      <section itemProp="articleBody">{content.render()}</section>

      <ToolbarMain showSubscriptionOptions {...props.state} />
      {props.renderIntoToolbar(
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.Article}
        />
      )}
      {props.renderIntoSettings(
        <Settings>
          <Settings.Textarea
            label={articleStrings.seoTitle}
            state={meta_title}
          />
          <Settings.Textarea
            label={articleStrings.seoDesc}
            state={meta_description}
          />
        </Settings>
      )}
    </>
  )
}
