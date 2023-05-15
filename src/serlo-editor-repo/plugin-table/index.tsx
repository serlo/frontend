import {
  EditorPlugin,
  EditorPluginProps,
  string,
  StringStateType,
} from '../plugin'
import { TableEditor } from './editor'

/**
 * @param config - {@link TableConfig | Plugin configuration}
 */
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
  i18n?: Partial<TablePluginConfig['i18n']>
  MarkdownRenderer?: TablePluginConfig['MarkdownRenderer']
}

export type TablePluginState = StringStateType

export interface TablePluginConfig {
  i18n: {
    placeholder: string
  }
  MarkdownRenderer: React.ComponentType<{ markdown: string }>
}

export type TableProps = EditorPluginProps<TablePluginState, TableConfig>
