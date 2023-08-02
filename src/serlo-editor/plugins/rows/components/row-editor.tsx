import clsx from 'clsx'
import { useRef } from 'react'

import { RowSeparator } from './row-separator'
import { RowsPluginConfig, RowsPluginState } from '..'
import { EditorRowRenderer } from '../editor-renderer'
import { StateTypeReturnType } from '@/serlo-editor/plugin'
import { pluginsWithData } from '@/serlo-editor/plugin/helpers/plugins-with-data'
import { selectIsFocused, useAppSelector } from '@/serlo-editor/store'

interface RowEditorProps {
  config: RowsPluginConfig
  onAddButtonClick(index: number): void
  index: number
  rows: StateTypeReturnType<RowsPluginState>
  row: StateTypeReturnType<RowsPluginState>[0]
  visuallyEmphasizeAddButton?: boolean
  isFirst?: boolean
  isLast?: boolean
}

export function RowEditor({
  config,
  onAddButtonClick,
  index,
  row,
  rows,
  visuallyEmphasizeAddButton = false,
  isFirst = false,
  isLast = false,
}: RowEditorProps) {
  const focused = useAppSelector((state) => selectIsFocused(state, row.id))
  const plugins = pluginsWithData.getAllPlugins()
  const dropContainer = useRef<HTMLDivElement>(null)

  return (
    // bigger drop zone with padding hack
    <div
      key={row.id}
      ref={dropContainer}
      className={clsx(
        'rows-child relative -ml-12 pl-12',
        isFirst && 'first',
        isLast && 'last'
      )}
    >
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
