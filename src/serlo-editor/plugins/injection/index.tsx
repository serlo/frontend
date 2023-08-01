import { InjectionEditor } from './editor'
import { string, EditorPlugin, EditorPluginProps } from '@/serlo-editor/plugin'

export const injectionState = string()

export type InjectionProps = EditorPluginProps<InjectionPluginState>
export type InjectionPluginState = typeof injectionState

export const injectionPlugin: EditorPlugin<InjectionPluginState> = {
  Component: InjectionEditor,
  state: injectionState,
  config: {},
}
