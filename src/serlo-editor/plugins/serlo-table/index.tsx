import { SerloTableEditor } from './editor'
import { TableType } from './renderer'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  child,
  EditorPlugin,
  EditorPluginProps,
  list,
  object,
  string,
} from '@/serlo-editor/plugin'

const tableState = object({
  rows: list(
    object({
      columns: list(
        object({
          content: child({ plugin: EditorPluginType.Text }),
        }),
        2
      ),
    }),
    4
  ),
  tableType: string(TableType.OnlyColumnHeader),
})

const defaultConfig: SerloTableConfig = {
  allowImageInTableCells: true,
}

export function createSerloTablePlugin(
  config = defaultConfig
): EditorPlugin<SerloTablePluginState, SerloTableConfig> {
  return {
    Component: SerloTableEditor,
    config: config,
    state: tableState,
  }
}

export type SerloTablePluginState = typeof tableState
export type SerloTableProps = EditorPluginProps<
  SerloTablePluginState,
  SerloTableConfig
>

export interface SerloTableConfig {
  allowImageInTableCells: boolean // Used in https://github.com/serlo/serlo-editor-for-edusharing
}
