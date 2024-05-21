import { DatenraumIntegrationEditor } from './editor'
import { state, DatenraumIntegrationState } from './state'
import { EditorPluginProps } from '../../plugin'

export type DatenraumIntegrationProps =
  EditorPluginProps<DatenraumIntegrationState>

export const datenraumIntegrationPlugin = {
  state,
  config: {},
  Component: DatenraumIntegrationEditor,
}
