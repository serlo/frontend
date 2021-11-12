import {
  child,
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '@edtr-io/plugin'

import { BoxRenderer } from './renderer'

export const boxState = object({
  type: string(''),
  title: child({ plugin: 'text' }),
  content: child({ plugin: 'rows' }),
})
export type BoxPluginState = typeof boxState
export type BoxProps = EditorPluginProps<BoxPluginState>

export function createBoxPlugin(): EditorPlugin<BoxPluginState> {
  return {
    Component: BoxRenderer,
    config: {},
    state: boxState,
  }
}
