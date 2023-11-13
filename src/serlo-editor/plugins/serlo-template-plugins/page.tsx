import { editorContent, headerInputClasses, uuid } from './common/common'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import {
  EditorPlugin,
  EditorPluginProps,
  number,
  object,
  optional,
  string,
} from '@/serlo-editor/plugin'

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
  const placeholder = useEditorStrings().templatePlugins.page.title

  return (
    <article>
      <h1 className="serlo-h1" itemProp="name">
        {props.editable ? (
          <input
            autoFocus
            className={headerInputClasses}
            placeholder={placeholder}
            value={title.value}
            onChange={(e) => title.set(e.target.value)}
          />
        ) : (
          title.value
        )}
      </h1>
      <section itemProp="articleBody">{content.render()}</section>
      <ToolbarMain {...props.state} />
    </article>
  )
}
