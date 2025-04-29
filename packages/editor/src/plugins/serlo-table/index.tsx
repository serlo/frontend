import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  list,
  object,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { SerloTableEditor } from './editor'
import { TableType } from './renderer'

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

export function createSerloTablePlugin(): EditorPlugin<SerloTablePluginState> {
  return {
    Component: SerloTableEditor,
    state: tableState,
  }
}

export type SerloTablePluginState = typeof tableState
export type SerloTableProps = EditorPluginProps<SerloTablePluginState>
