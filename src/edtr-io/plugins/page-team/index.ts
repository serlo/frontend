import {
  EditorPlugin,
  object,
  EditorPluginProps,
  string,
} from '@edtr-io/plugin'

import { PageTeamEditor } from './editor'

export const PageTeamState = object({
  type: string(),
  data: string(),
})

export type PageTeamPluginState = typeof PageTeamState
export type PageTeamPluginProps = EditorPluginProps<PageTeamPluginState>

export const pageTeamPlugin: EditorPlugin<PageTeamPluginState> = {
  Component: PageTeamEditor,
  state: PageTeamState,
  config: {},
}
