import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

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
        <select
          className={cn(`
                mr-2 cursor-pointer rounded-md !border border-gray-500
              bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
              hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `)}
          value={tableType}
          onChange={(e) => state.tableType.set(e.target.value)}
        >
          <option value={TableType.OnlyColumnHeader}>
            {tableStrings.columnHeaders}
          </option>
          <option value={TableType.OnlyRowHeader}>
            {tableStrings.rowHeaders}
          </option>
          <option value={TableType.ColumnAndRowHeader}>
            {tableStrings.columnAndRowHeaders}
          </option>
        </select>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
      className="-mt-1.5"
    />
  )
}
