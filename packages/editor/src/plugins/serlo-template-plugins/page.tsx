import { SaveButton } from '@editor/editor-ui/editor-toolbar/save-button'
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
  const { title, content, licenseId } = props.state

  return (
    <article>
      <EntityTitleInput title={title} />

      <section itemProp="articleBody">{content.render()}</section>
      <SaveButton licenseId={licenseId} />
    </article>
  )
}
