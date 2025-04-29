import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { editorContent } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'

export const articleTypeState = object({
  title: string(),
  content: editorContent(EditorPluginType.Article),
})

export type ArticleTypePluginState = typeof articleTypeState

export const articleTypePlugin: EditorPlugin<ArticleTypePluginState> = {
  Component: ArticleTypeEditor,
  state: articleTypeState,
}

function ArticleTypeEditor(props: EditorPluginProps<ArticleTypePluginState>) {
  const { title, content } = props.state

  return (
    <>
      <EntityTitleInput title={title} forceFocus />

      <section itemProp="articleBody">{content.render()}</section>
    </>
  )
}
