import {
  EditorPlugin,
  object,
  EditorPluginProps,
  string,
} from '@edtr-io/plugin'

import { PageSpecialContentEditor } from './editor'

export const pageSpecialContentState = object({
  type: string(),
  data: string(),
})

export type PageSpecialContentPluginState = typeof pageSpecialContentState
export type PageSpecialContentPluginProps =
  EditorPluginProps<PageSpecialContentPluginState>

export const pageSpecialContentPlugin: EditorPlugin<PageSpecialContentPluginState> =
  {
    Component: PageSpecialContentEditor,
    state: pageSpecialContentState,
    config: {},
  }
