// In some places (e.g. tables plugin) we only render slate on focus.
// To make the rendering work and persist value/selection/focus, we
// store the state here

import { Descendant, Selection } from 'slate'

export const instanceStateStore: {
  [pluginId: string]: {
    selection: Selection
    value: Descendant[]
    needRefocus: number
  }
} = {}
