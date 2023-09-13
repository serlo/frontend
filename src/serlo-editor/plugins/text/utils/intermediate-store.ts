// In some places (e.g. tables plugin) we only render slate on focus.
// To make the rendering work and persist value/selection/focus, we
// introduce an intermediate store as a proxy.

import { Descendant, Selection } from 'slate'

export const intermediateStore: {
  [pluginId: string]: {
    selection: Selection
    value: Descendant[]
    needRefocus: number
  }
} = {}
