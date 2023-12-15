import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
} from '@editor/plugin'

import { PagePartnersEditor } from './editor'

const pagePartnersState = object({})
export type PagePartnersPluginState = typeof pagePartnersState
export type PagePartnersPluginProps = EditorPluginProps<PagePartnersPluginState>

export const pagePartnersPlugin: EditorPlugin = {
  Component: PagePartnersEditor,
  state: pagePartnersState,
  config: {},
}
