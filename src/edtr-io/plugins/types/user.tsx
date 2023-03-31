import { EditorPlugin, EditorPluginProps, object } from 'test-edtr-io/plugin'

import { editorContent } from './common/common'
import { ToolbarMain } from './toolbar-main/toolbar-main'

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
      <ToolbarMain />
    </>
  )
}
