import { SerloInjectionEditor } from './editor'
import { type EditorPlugin, type EditorPluginProps, string } from '../../plugin'

const serloInjectionState = string()

// as far as i know this is only used in edusharing right now
export const serloInjectionPlugin: EditorPlugin<SerloInjectionPluginState> = {
  Component: SerloInjectionEditor,
  state: serloInjectionState,
}

export type SerloInjectionPluginState = typeof serloInjectionState
export type SerloInjectionProps = EditorPluginProps<SerloInjectionPluginState>
