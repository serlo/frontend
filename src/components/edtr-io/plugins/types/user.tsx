import { EditorPlugin, EditorPluginProps, object } from '@edtr-io/plugin'
import * as React from 'react'

import { Controls, editorContent } from './common'

export const userTypeState = object({
  description: editorContent(),
})

export const userTypePlugin: EditorPlugin<typeof userTypeState> = {
  Component: UserTypeEditor,
  state: userTypeState,
  config: {},
}

function UserTypeEditor(props: EditorPluginProps<typeof userTypeState>) {
  const { description } = props.state

  return (
    <>
      {description.render()}
      <Controls />
    </>
  )
}
