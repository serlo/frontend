import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar/components/toolbar-select'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { BlanksTableProps } from '.'
import { TableType } from './types'
import { getTableType } from './utils/get-table-type'

export const BlanksTableToolbar = ({ id, state }: BlanksTableProps) => {
  const blanksTableStrings = useEditorStrings().plugins.blanksTable

  const tableType = getTableType(state.tableType.value)

  return (
    <PluginToolbar
      pluginType={EditorPluginType.BlanksTable}
      pluginSettings={
        <ToolbarSelect
          tooltipText=""
          value={tableType}
          changeValue={(value) => state.tableType.set(value)}
          options={[
            {
              value: TableType.OnlyColumnHeader,
              text: blanksTableStrings.columnHeaders,
            },
            {
              value: TableType.OnlyRowHeader,
              text: blanksTableStrings.rowHeaders,
            },
            {
              value: TableType.ColumnAndRowHeader,
              text: blanksTableStrings.columnAndRowHeaders,
            },
          ]}
        />
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
      className="-mt-1.5"
    />
  )
}
