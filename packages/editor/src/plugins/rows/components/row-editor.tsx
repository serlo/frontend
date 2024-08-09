import { StateTypeReturnType } from '@editor/plugin'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { selectIsFocused, useAppSelector } from '@editor/store'
import { type MouseEvent, useRef } from 'react'

import { AddRowButtonFloating } from './add-row-button-floating'
import type { RowsPluginConfig, RowsPluginState } from '..'
import { EditorRowRenderer } from '../editor-renderer'

interface RowEditorProps {
  config: RowsPluginConfig
  index: number
  rows: StateTypeReturnType<RowsPluginState>
  row: StateTypeReturnType<RowsPluginState>[0]
  hideAddButton: boolean
  onAddButtonClick: (insertIndex: number) => void
}

export function RowEditor({
  config,
  index,
  row,
  rows,
  hideAddButton,
  onAddButtonClick,
}: RowEditorProps) {
  const focused = useAppSelector((state) => selectIsFocused(state, row.id))
  const plugins = editorPlugins.getAllWithData()
  const dropContainer = useRef<HTMLDivElement>(null)

  function handleAddPluginButtonClick(event: MouseEvent) {
    event.preventDefault()
    onAddButtonClick(index + 1)
  }

  return (
    <div
      key={row.id}
      ref={dropContainer}
      // bigger drop zone with padding hack
      className="rows-child relative -ml-12 pl-12"
    >
      <EditorRowRenderer
        config={config}
        row={row}
        rows={rows}
        index={index}
        plugins={plugins}
        dropContainer={dropContainer}
      />
      {hideAddButton ? null : (
        <AddRowButtonFloating
          focused={focused}
          onClick={handleAddPluginButtonClick}
        />
      )}
    </div>
  )
}
