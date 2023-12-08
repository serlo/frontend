import { SolutionEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
  string,
  optional,
  number,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

const solutionState = object({
  strategy: child({ plugin: EditorPluginType.Text }),
  steps: child({ plugin: EditorPluginType.Rows }),
  prerequisite: optional(
    object({
      id: string(),
      title: string(),
      alias: optional(string()),
    })
  ),
  licenseId: optional(number()),
})

export type SolutionPluginState = typeof solutionState
export type SolutionProps = EditorPluginProps<SolutionPluginState>

export const solutionPlugin: EditorPlugin<SolutionPluginState> = {
  Component: SolutionEditor,
  state: solutionState,
  config: {},
}
