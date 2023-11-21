import { SolutionEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
  string,
  optional,
  number,
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

function createSolutionState(config: SolutionConfig) {
  return object({
    strategy: child({ plugin: EditorPluginType.Text }),
    steps: child({
      plugin: EditorPluginType.Rows,
      config: { allowedPlugins: config.allowedPlugins },
    }),
    prerequisite: optional(
      object({
        id: string(),
        title: string(),
        alias: optional(string()),
      })
    ),
    licenseId: optional(number()),
  })
}

export type SolutionPluginState = ReturnType<typeof createSolutionState>
export type SolutionProps = EditorPluginProps<SolutionPluginState>

export const defaultConfig: SolutionConfig = {}

export function createSolutionPlugin(
  config = defaultConfig
): EditorPlugin<SolutionPluginState> {
  return {
    Component: SolutionEditor,
    state: createSolutionState(config),
    config: config,
  }
}

export interface SolutionConfig {
  allowedPlugins?: (EditorPluginType | string)[]
}
