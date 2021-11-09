import {
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '@edtr-io/plugin'
import * as React from 'react'

import { editorContent, HeaderInput, license, uuid } from './common/common'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

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
                placeholder={editorStrings.page.title}
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
