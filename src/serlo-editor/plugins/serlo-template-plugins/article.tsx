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

export const articleTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent('article'),
    meta_title: string(),
    meta_description: string(),
  },
  {}
)

export const articleTypePlugin: EditorPlugin<ArticleTypePluginState> = {
  Component: ArticleTypeEditor,
  state: articleTypeState,
  config: {},
}

type ArticleTypePluginState = typeof articleTypeState

function ArticleTypeEditor(props: EditorPluginProps<ArticleTypePluginState>) {
  const { title, content, meta_title, meta_description } = props.state

  const articleStrings = useEditorStrings().templatePlugins.article

  return (
    <>
      <div className="page-header">
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
        <h1>
          {props.editable ? (
            <input
              className={headerInputClasses}
              placeholder={articleStrings.title}
              value={title.value}
              onChange={(e) => title.set(e.target.value)}
            />
          ) : (
            <span itemProp="name">{title.value}</span>
          )}
        </h1>
      </div>
      <div itemProp="articleBody">{content.render()}</div>
      <ToolbarMain showSubscriptionOptions {...props.state} />
    </>
  )
}
