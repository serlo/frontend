import {
  EditorPlugin,
  EditorPluginProps,
  list,
  number,
  object,
  string,
  upload,
} from '@editor/plugin'

import { TermMatchingEditor } from './editor'

export const targetState = object({
  id: string(),
  name: string(),
  position: object({
    x: number(),
    y: number(),
  }),
})

const termMatchingState = object({
  image: upload(''),
  targets: list(targetState),
})

export type TermMatchingProps = EditorPluginProps<TermMatchingPluginState>
export type TermMatchingTargetProps = EditorPluginProps<
  typeof targetState
>['state']
export type TermMatchingPluginState = typeof termMatchingState

export const termMatchingPlugin: EditorPlugin<TermMatchingPluginState> = {
  Component: TermMatchingEditor,
  config: {},
  state: termMatchingState,
}
