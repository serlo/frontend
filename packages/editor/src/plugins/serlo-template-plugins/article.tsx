import {
  child,
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { EntityTitleInput } from './common/entity-title-input'

export const articleTypeState = object({
  title: string(),
  content: child({ plugin: EditorPluginType.Article }),
})

export type ArticleTypePluginState = typeof articleTypeState

export const articleTypePlugin: EditorPlugin<ArticleTypePluginState> = {
  Component: ArticleTypeEditor,
  state: articleTypeState,
  config: {},
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
