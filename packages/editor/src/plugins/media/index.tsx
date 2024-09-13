import { object } from '@editor/plugin'

const state = object({})

export const mediaPlugin = {
  state,
  config: {},
  Component: () => <div>Media Plugin</div>,
}
