import { InjectionEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@/serlo-editor/plugin'

export const injectionState = string()

export type InjectionProps = EditorPluginProps<InjectionPluginState>
export type InjectionPluginState = typeof injectionState

export const injectionPlugin: EditorPlugin<InjectionPluginState> = {
  Component: InjectionEditor,
  state: injectionState,
  config: {},
}
