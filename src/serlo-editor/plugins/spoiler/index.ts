import {
  child,
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '../../plugin'
import { SpoilerEditor } from './editor'

const spoilerState = object({
  title: string(''),
  content: child({ plugin: 'rows' }),
})

export function createSpoilerPlugin(): EditorPlugin<SpoilerPluginState> {
  return {
    Component: SpoilerEditor,
    state: spoilerState,
    config: {},
  }
}

export type SpoilerPluginState = typeof spoilerState

export type SpoilerProps = EditorPluginProps<SpoilerPluginState>
