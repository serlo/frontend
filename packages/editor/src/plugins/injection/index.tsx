import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'

import { InjectionEditor } from './editor'

export const injectionState = string()

export type InjectionProps = EditorPluginProps<InjectionPluginState>
export type InjectionPluginState = typeof injectionState

export const injectionPlugin: EditorPlugin<InjectionPluginState> = {
  Component: InjectionEditor,
  state: injectionState,
  config: {},
}
