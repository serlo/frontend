import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  number,
  child,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { EntityTitleInput } from './common/entity-title-input'

export const taxonomyTypeState = object({
  term: object({
    name: string(),
  }),
  parent: number(),
  position: number(),
  content: child({ plugin: EditorPluginType.Rows }),
})

export type TaxonomyTypePluginState = typeof taxonomyTypeState

export const taxonomyTypePlugin: EditorPlugin<TaxonomyTypePluginState> = {
  Component: TaxonomyTypeEditor,
  state: taxonomyTypeState,
  config: {},
}

function TaxonomyTypeEditor(props: EditorPluginProps<TaxonomyTypePluginState>) {
  const { term, content } = props.state

  return (
    <>
      <header>
        <EntityTitleInput title={term.name} />
      </header>

      {content.render()}
    </>
  )
}
