import {
  child,
  type EditorPlugin,
  type EditorPluginProps,
  object,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

export const userTypeState = object({
  content: child({ plugin: EditorPluginType.Rows }),
})

export type UserTypePluginState = typeof userTypeState

export const userTypePlugin: EditorPlugin<UserTypePluginState> = {
  Component: UserTypeEditor,
  state: userTypeState,
}

function UserTypeEditor({ state }: EditorPluginProps<UserTypePluginState>) {
  return state.content.render()
}
