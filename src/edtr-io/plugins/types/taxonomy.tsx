import {
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
  number,
} from '@edtr-io/plugin'
import * as React from 'react'

import { editorContent, HeaderInput, uuid } from './common/common'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

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
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <article>
      <header>
        <div className="page-header">
          <h1>
            {props.editable ? (
              <HeaderInput
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
