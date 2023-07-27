import { TableEditor } from './editor'
import {
  EditorPlugin,
  EditorPluginProps,
  string,
  StringStateType,
} from '../../../plugin'

export function createTablePlugin(
  config: TableConfig = {}
): EditorPlugin<TablePluginState, TableConfig> {
  return {
    Component: TableEditor,
    config,
    state: string(),
  }
}

export interface TableConfig {
  MarkdownRenderer?: TablePluginConfig['MarkdownRenderer']
}

export type TablePluginState = StringStateType

export interface TablePluginConfig {
  MarkdownRenderer: React.ComponentType<{ markdown: string }>
}

export type TableProps = EditorPluginProps<TablePluginState, TableConfig>
