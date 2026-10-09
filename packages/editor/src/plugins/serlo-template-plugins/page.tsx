import {
  child,
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { EntityTitleInput } from './common/entity-title-input'

export const pageTypeState = object({
  title: string(),
  content: child({ plugin: EditorPluginType.Rows }),
})

export type PageTypePluginState = typeof pageTypeState

export const pageTypePlugin: EditorPlugin<PageTypePluginState> = {
  Component: PageTypeEditor,
  state: pageTypeState,
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
