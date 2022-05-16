import {
  EditorPlugin,
  object,
  EditorPluginProps,
  string,
  list,
} from '@edtr-io/plugin'

import { PageTeamEditor } from './editor'

export const PageTeamState = object({
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

export type PageTeamPluginState = typeof PageTeamState
export type PageTeamPluginProps = EditorPluginProps<PageTeamPluginState>

export const pageTeamPlugin: EditorPlugin<PageTeamPluginState> = {
  Component: PageTeamEditor,
  state: PageTeamState,
  config: {},
}
