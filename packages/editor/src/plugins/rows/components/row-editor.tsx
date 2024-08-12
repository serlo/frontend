import { StateTypeReturnType } from '@editor/plugin'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { selectIsFocused, useAppSelector } from '@editor/store'
import { useRef } from 'react'

import { AddRowButtonFloating } from './add-row-button-floating'
import type { RowsPluginConfig, RowsPluginState } from '..'
import { EditorRowRenderer } from '../editor-renderer'

interface RowEditorProps {
  config: RowsPluginConfig
  onAddButtonClick(index: number): void
  index: number
  rows: StateTypeReturnType<RowsPluginState>
  row: StateTypeReturnType<RowsPluginState>[0]
  hideAddButton?: boolean
}

export function RowEditor({
  config,
  onAddButtonClick,
  index,
  row,
  rows,
  hideAddButton = false,
}: RowEditorProps) {
  const focused = useAppSelector((state) => selectIsFocused(state, row.id))
  const plugins = editorPlugins.getAllWithData()
  const dropContainer = useRef<HTMLDivElement>(null)

  const isLastRow = index === rows.length - 1

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
      <AddRowButtonFloating
        focused={focused}
        onClick={(event: React.MouseEvent) => {
          event.preventDefault()
          onAddButtonClick(index + 1)
        }}
        hide={hideAddButton || isLastRow}
      />
    </div>
  )
}
