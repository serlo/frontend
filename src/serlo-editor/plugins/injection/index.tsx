import { InjectionEditor } from './editor'
import { string, EditorPlugin } from '@/serlo-editor/plugin'

export const injectionState = string()

export type InjectionPluginState = typeof injectionState

export const injectionPlugin: EditorPlugin<InjectionPluginState> = {
  Component: InjectionEditor,
  state: injectionState,
  config: {},
}
