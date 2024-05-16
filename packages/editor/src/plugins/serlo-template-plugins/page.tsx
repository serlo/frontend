import {
  EditorPlugin,
  EditorPluginProps,
  number,
  object,
  optional,
  string,
} from '@editor/plugin'

import { editorContent, uuid } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'
import { ToolbarMain } from './toolbar-main/toolbar-main'

export const pageTypeState = object({
  ...uuid,
  licenseId: optional(number()),
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
      <ToolbarMain {...props.state} />
    </article>
  )
}
