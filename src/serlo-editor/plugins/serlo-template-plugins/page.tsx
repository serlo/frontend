import {
  editorContent,
  headerInputClasses,
  license,
  uuid,
} from './common/common'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import {
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '@/serlo-editor/plugin'

export const pageTypeState = object({
  ...uuid,
  ...license,
  title: string(),
  content: editorContent(),
})

export const pageTypePlugin: EditorPlugin<typeof pageTypeState> = {
  Component: PageTypeEditor,
  state: pageTypeState,
  config: {},
}

function PageTypeEditor(props: EditorPluginProps<typeof pageTypeState>) {
  const { title, content } = props.state
  const editorStrings = useEditorStrings()

  return (
    <article>
      <header>
        <div className="page-header">
          <h1>
            {props.editable ? (
              <input
                className={headerInputClasses}
                placeholder={editorStrings.templatePlugins.page.title}
                value={title.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  title.set(e.target.value)
                }}
              />
            ) : (
              <span itemProp="name">{title.value}</span>
            )}
          </h1>
        </div>
      </header>
      <section itemProp="articleBody">{content.render()}</section>
      <ToolbarMain {...props.state} />
    </article>
  )
}
