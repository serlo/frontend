import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { DatenraumIntegrationEditor } from './editor'
import { boolean, child, EditorPluginProps, object, string } from '../../plugin'

export const state = object({
  showResource: boolean(false),
  resource: string('https://app.lumi.education/run/J3j0eR'),
  convertedResource: child({
    plugin: EditorPluginType.PasteHack,
  }),
})
export type DatenraumIntegrationState = typeof state

export type DatenraumIntegrationProps =
  EditorPluginProps<DatenraumIntegrationState>

export const datenraumIntegrationPlugin = {
  state,
  config: {},
  Component: DatenraumIntegrationEditor,
}
