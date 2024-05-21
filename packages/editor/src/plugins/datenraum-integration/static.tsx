import { DatenraumIntegrationState } from './state'
import type { PrettyStaticState } from '../../plugin'
import { H5pRenderer } from '../h5p/renderer'

export interface DatenraumIntegrationDocument {
  state: PrettyStaticState<DatenraumIntegrationState>
}

export function DatenraumIntegrationStaticRenderer({
  state,
}: DatenraumIntegrationDocument) {
  const { showResource, resource } = state

  return showResource ? <H5pRenderer url={resource} /> : null
}
