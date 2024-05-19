import { object, optional, string } from '../../plugin'

export const state = object({
  resource: optional(
    object({
      url: string(),
      title: string(),
      description: string(),
    })
  ),
})

export type DatenraumIntegrationState = typeof state
