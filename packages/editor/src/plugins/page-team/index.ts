import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  list,
} from '@editor/plugin'

import { PageTeamEditor } from './editor'

const pageTeamState = object({
  data: list(
    object({
      firstName: string(),
      lastName: string(),
      user: string(),
      position: string(),
      extraLinkUrl: string(),
      extraLinkText: string(),
      photo: string(),
    })
  ),
})

export type PageTeamPluginState = typeof pageTeamState
export type PageTeamPluginProps = EditorPluginProps<PageTeamPluginState>

export const pageTeamPlugin: EditorPlugin<PageTeamPluginState> = {
  Component: PageTeamEditor,
  state: pageTeamState,
  config: {},
}
