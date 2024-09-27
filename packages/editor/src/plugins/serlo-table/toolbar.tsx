import { PluginToolbar, ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@editor/utils/use-editor-strings'

import type { SerloTableProps } from '.'
import { TableType } from './renderer'
import { getTableType } from './utils/get-table-type'

export const SerloTableToolbar = ({ id, state }: SerloTableProps) => {
  const tableStrings = useEditorStrings().plugins.serloTable

  const tableType = getTableType(state.tableType.value)

  return (
    <PluginToolbar
      pluginType={EditorPluginType.SerloTable}
      pluginSettings={
        <ToolbarSelect
          tooltipText=""
          value={tableType}
          changeValue={(value) => state.tableType.set(value)}
          options={[
            {
              value: TableType.OnlyColumnHeader,
              text: tableStrings.columnHeaders,
            },
            { value: TableType.OnlyRowHeader, text: tableStrings.rowHeaders },
            {
              value: TableType.ColumnAndRowHeader,
              text: tableStrings.columnAndRowHeaders,
            },
          ]}
        />
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
      className="-mt-1.5"
    />
  )
}
