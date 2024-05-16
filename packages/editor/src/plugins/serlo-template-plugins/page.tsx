import {
  EditorPlugin,
  EditorPluginProps,
  number,
  object,
  optional,
  string,
} from '@editor/plugin'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import { editorContent, headerInputClasses, uuid } from './common/common'
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
  const placeholder = useEditorStrings().templatePlugins.entity.titlePlaceholder

  return (
    <article>
      <h1 className="serlo-h1" itemProp="name">
        <input
          autoFocus
          className={headerInputClasses}
          placeholder={placeholder}
          value={title.value}
          onChange={(e) => title.set(e.target.value)}
        />
      </h1>
      <section itemProp="articleBody">{content.render()}</section>
      <ToolbarMain {...props.state} />
    </article>
  )
}
