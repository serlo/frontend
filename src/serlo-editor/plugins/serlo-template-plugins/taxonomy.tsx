import { editorContent, headerInputClasses, uuid } from './common/common'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import {
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
  number,
} from '@/serlo-editor/plugin'

export const taxonomyTypeState = object({
  ...uuid,
  term: object({
    name: string(),
  }),
  taxonomy: number(),
  parent: number(),
  position: number(),
  description: editorContent(),
})

export const taxonomyTypePlugin: EditorPlugin<typeof taxonomyTypeState> = {
  Component: TaxonomyTypeEditor,
  state: taxonomyTypeState,
  config: {},
}

function TaxonomyTypeEditor(
  props: EditorPluginProps<typeof taxonomyTypeState>
) {
  const { term, description } = props.state
  const editorStrings = useEditorStrings()

  return (
    <article>
      <header>
        <div className="page-header">
          <h1>
            {props.editable ? (
              <input
                className={headerInputClasses}
                placeholder={editorStrings.taxonomy.title}
                value={term.name.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  term.name.set(e.target.value)
                }}
              />
            ) : (
              <span itemProp="name">{term.name.value}</span>
            )}
          </h1>
        </div>
      </header>
      <section itemProp="articleBody">{description.render()}</section>
      <ToolbarMain />
    </article>
  )
}
