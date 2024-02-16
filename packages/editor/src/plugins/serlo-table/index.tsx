import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
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

const headerTextFormattingOptions = [
  TextEditorFormattingOption.code,
  TextEditorFormattingOption.links,
  TextEditorFormattingOption.math,
]

const cellTextFormattingOptions = [
  TextEditorFormattingOption.code,
  TextEditorFormattingOption.colors,
  TextEditorFormattingOption.links,
  TextEditorFormattingOption.lists,
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.richTextBold,
  TextEditorFormattingOption.richTextItalic,
]

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
  headerTextFormattingOptions,
  cellTextFormattingOptions,
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
  headerTextFormattingOptions?: TextEditorFormattingOption[]
  cellTextFormattingOptions?: TextEditorFormattingOption[]
}
