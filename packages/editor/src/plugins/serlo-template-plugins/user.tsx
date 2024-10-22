import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
} from '@editor/plugin'

import { editorContent } from './common/common'

export const userTypeState = object({ description: editorContent() })

export type UserTypePluginState = typeof userTypeState

export const userTypePlugin: EditorPlugin<UserTypePluginState> = {
  Component: UserTypeEditor,
  state: userTypeState,
  config: {},
}

function UserTypeEditor({ state }: EditorPluginProps<UserTypePluginState>) {
  return <>{state.description.render()}</>
}
