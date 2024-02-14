import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  list,
  object,
  string,
  optional,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { BlanksTableEditor } from './editor'
import { BlanksMode, TableType } from './types'

const defaultMode: BlanksMode = 'typing'

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
  mode: string(defaultMode),
  extraDraggableAnswers: optional(list(object({ answer: string() }))),
})

export function createBlanksTablePlugin(): EditorPlugin<BlanksTablePluginState> {
  return {
    Component: BlanksTableEditor,
    config: {},
    state: tableState,
  }
}

export type BlanksTablePluginState = typeof tableState
export type BlanksTableProps = EditorPluginProps<BlanksTablePluginState>
