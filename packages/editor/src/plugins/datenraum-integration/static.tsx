import { LearningResourceComponent } from './components/learning-resource'
import { DatenraumIntegrationState } from './state'
import type { PrettyStaticState } from '../../plugin'

export interface DatenraumIntegrationDocument {
  state: PrettyStaticState<DatenraumIntegrationState>
}

export function DatenraumIntegrationStaticRenderer({
  state,
}: DatenraumIntegrationDocument) {
  const { resource } = state

  return resource ? (
    <LearningResourceComponent
      resource={resource}
      onClick={() => window.open(resource.url, '_blank')}
    />
  ) : null
}
