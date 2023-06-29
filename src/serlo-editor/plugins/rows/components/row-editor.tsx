import { useRef } from 'react'

import { RowsPluginConfig, RowsPluginState } from '..'
import { EditorRowRenderer } from '../editor-renderer'
import { RowSeparator } from './row-separator'
import { usePlugins } from '@/serlo-editor/core/contexts/plugins-context'
import { StateTypeReturnType } from '@/serlo-editor/plugin'
import { selectIsFocused, useAppSelector } from '@/serlo-editor/store'

interface RowEditorProps {
  config: RowsPluginConfig
  onAddButtonClick(index: number): void
  index: number
  rows: StateTypeReturnType<RowsPluginState>
  row: StateTypeReturnType<RowsPluginState>[0]
  visuallyEmphasizeAddButton?: boolean
  isLast?: boolean
}

export function RowEditor({
  config,
  onAddButtonClick,
  index,
  row,
  rows,
  visuallyEmphasizeAddButton = false,
  isLast = false,
}: RowEditorProps) {
  const focused = useAppSelector((state) => selectIsFocused(state, row.id))
  const plugins = usePlugins()
  const dropContainer = useRef<HTMLDivElement>(null)

  return (
    // bigger drop zone with padding hack
    <div key={row.id} ref={dropContainer} className="relative -ml-12 pl-12">
      <EditorRowRenderer
        config={config}
        row={row}
        rows={rows}
        index={index}
        plugins={plugins}
        dropContainer={dropContainer}
      />
      <RowSeparator
        config={config}
        focused={focused}
        onClick={(event: React.MouseEvent) => {
          event.preventDefault()
          onAddButtonClick(index + 1)
        }}
        isLast={isLast}
        visuallyEmphasizeAddButton={visuallyEmphasizeAddButton}
      />
    </div>
  )
}
