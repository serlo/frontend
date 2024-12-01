import { DatenraumIntegrationState } from '.'
import type { PrettyStaticState } from '../../plugin'

export interface DatenraumIntegrationDocument {
  state: PrettyStaticState<DatenraumIntegrationState>
}

export function DatenraumIntegrationStaticRenderer({
  state,
}: DatenraumIntegrationDocument) {
  const { showResource } = state

  return showResource ? 123123 : null
}
