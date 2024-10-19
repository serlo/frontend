import { SaveButton } from '@editor/editor-ui/editor-toolbar/save-button'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  number,
} from '@editor/plugin'

import { editorContent, uuid } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'

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

  return (
    <>
      <header>
        <EntityTitleInput title={term.name} />
      </header>

      {description.render()}

      <SaveButton />
    </>
  )
}
