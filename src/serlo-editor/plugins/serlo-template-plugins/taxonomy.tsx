import { editorContent, headerInputClasses, uuid } from './common/common'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import {
  type EditorPlugin,
  type EditorPluginProps,
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

export type TaxonomyTypePluginState = typeof taxonomyTypeState

export const taxonomyTypePlugin: EditorPlugin<TaxonomyTypePluginState> = {
  Component: TaxonomyTypeEditor,
  state: taxonomyTypeState,
  config: {},
}

function TaxonomyTypeEditor(props: EditorPluginProps<TaxonomyTypePluginState>) {
  const { term, description } = props.state
  const editorStrings = useEditorStrings()

  return (
    <>
      <header>
        <h1 className="serlo-h1" itemProp="name">
          {props.editable ? (
            <input
              className={headerInputClasses}
              placeholder={editorStrings.taxonomy.title}
              value={term.name.value}
              onChange={(e) => term.name.set(e.target.value)}
            />
          ) : (
            term.name.value
          )}
        </h1>
      </header>

      {description.render()}

      <ToolbarMain />
    </>
  )
}
