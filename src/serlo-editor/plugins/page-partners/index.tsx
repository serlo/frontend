import { PagePartnersEditor } from './editor'
import { EditorPlugin, EditorPluginProps, object } from '@/serlo-editor/plugin'

const pagePartnersState = object({})
export type PagePartnersPluginState = typeof pagePartnersState
export type PagePartnersPluginProps = EditorPluginProps<PagePartnersPluginState>

export const pagePartnersPlugin: EditorPlugin = {
  Component: PagePartnersEditor,
  state: pagePartnersState,
  config: {},
}
