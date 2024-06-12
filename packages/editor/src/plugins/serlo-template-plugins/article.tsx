import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { UuidType } from '@serlo/frontend/src/data-types'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'

import { editorContent, entity, entityType } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'
import { MetadataFieldsModal } from './common/metadata-fields-modal'
import { ToolbarMain } from './toolbar-main/toolbar-main'

export const articleTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(EditorPluginType.Article),
  },
  {}
)

export type ArticleTypePluginState = typeof articleTypeState

export const articleTypePlugin: EditorPlugin<ArticleTypePluginState> = {
  Component: ArticleTypeEditor,
  state: articleTypeState,
  config: {},
}

function ArticleTypeEditor(props: EditorPluginProps<ArticleTypePluginState>) {
  const {
    title,
    content,
    meta_title: metaTitle,
    meta_description: metaDescription,
  } = props.state

  return (
    <>
      <div className="absolute right-0 -mt-10 mr-side flex">
        <MetadataFieldsModal
          metaTitle={metaTitle}
          metaDescription={metaDescription}
        />
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.Article}
        />
      </div>
      <EntityTitleInput title={title} forceFocus />

      <section itemProp="articleBody">{content.render()}</section>

      <ToolbarMain showSubscriptionOptions {...props.state} />
    </>
  )
}
