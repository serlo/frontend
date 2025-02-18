import { EditorPlugin, EditorPluginProps, object, string } from '@editor/plugin'

import { editorContent } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'

export const pageTypeState = object({
  title: string(),
  content: editorContent(),
})

export type PageTypePluginState = typeof pageTypeState

export const pageTypePlugin: EditorPlugin<PageTypePluginState> = {
  Component: PageTypeEditor,
  state: pageTypeState,
  config: {},
}

function PageTypeEditor(props: EditorPluginProps<PageTypePluginState>) {
  const { title, content } = props.state

  return (
    <article>
      <EntityTitleInput title={title} />

      <section itemProp="articleBody">{content.render()}</section>
    </article>
  )
}
