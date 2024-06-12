import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  number,
} from '@editor/plugin'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import { editorContent, headerInputClasses, uuid } from './common/common'
import { ToolbarMain } from './toolbar-main/toolbar-main'

export const taxonomyTypeState = object({
  ...uuid,
  term: object({
    name: string(),
  }),
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
          <input
            autoFocus
            className={headerInputClasses}
            placeholder={editorStrings.taxonomy.title}
            value={term.name.value}
            onChange={(e) => term.name.set(e.target.value)}
          />
        </h1>
      </header>

      {description.render()}

      <ToolbarMain />
    </>
  )
}
