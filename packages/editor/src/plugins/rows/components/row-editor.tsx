import { AddPluginModal } from '@editor/core/components/add-plugin-modal/add-plugin-modal'
import { PluginSelectionMenuContext } from '@editor/core/contexts/plugins-context'
import { StateTypeReturnType } from '@editor/plugin'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { selectIsFocused, useAppSelector } from '@editor/store'
import { useContext, useRef } from 'react'

import { AddRowButtonFloating } from './add-row-button-floating'
import type { RowsPluginConfig, RowsPluginState } from '..'
import { EditorRowRenderer } from '../editor-renderer'

interface RowEditorProps {
  config: RowsPluginConfig
  index: number
  rows: StateTypeReturnType<RowsPluginState>
  row: StateTypeReturnType<RowsPluginState>[0]
  hideAddButton?: boolean
  insertPluginCallback: (pluginType: string, insertIndex?: number) => void
}

export function RowEditor({
  config,
  index,
  row,
  rows,
  hideAddButton = false,
  insertPluginCallback,
}: RowEditorProps) {
  const focused = useAppSelector((state) => selectIsFocused(state, row.id))
  const plugins = editorPlugins.getAllWithData()
  const dropContainer = useRef<HTMLDivElement>(null)
  const pContext = useContext(PluginSelectionMenuContext)

  return (
    <div
      key={row.id}
      ref={dropContainer}
      // bigger drop zone with padding hack
      className="rows-child relative -ml-12 pl-12"
    >
      <AddPluginModal />
      <EditorRowRenderer
        config={config}
        row={row}
        rows={rows}
        index={index}
        plugins={plugins}
        dropContainer={dropContainer}
      />
      <AddRowButtonFloating
        focused={focused}
        onClick={(event: React.MouseEvent) => {
          event.preventDefault()
          pContext.openSuggestions(insertPluginCallback, index + 1)
        }}
        hide={hideAddButton}
      />
    </div>
  )
}
