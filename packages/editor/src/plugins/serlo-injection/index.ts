import { SerloInjectionEditor } from './editor'
import { type EditorPlugin, type EditorPluginProps, string } from '../../plugin'

const state = string()

// as far as i know this is only used in edusharing right now
export function createSerloInjectionPlugin(): EditorPlugin<SerloInjectionPluginState> {
  return {
    Component: SerloInjectionEditor,
    state,
  }
}

export type SerloInjectionPluginState = typeof state

export type SerloInjectionProps = EditorPluginProps<SerloInjectionPluginState>
