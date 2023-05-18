import { useRef } from 'react'

import { RowsPluginConfig, RowsPluginState } from '..'
import { StateTypeReturnType } from '../../plugin'
import { getPlugins, isFocused } from '../../store'
import { styled } from '../../ui'
import { RowRenderer } from './row-renderer'
import { RowSeparator } from './row-separator'
import { useSelector } from '@/serlo-editor-repo/core'

const DropContainer = styled.div({
  position: 'relative',
  // increase dropZone
  marginLeft: '-50px',
  paddingLeft: '50px',
})

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
  const focused = useSelector(isFocused(row.id))
  const plugins = useSelector(getPlugins())
  const dropContainer = useRef<HTMLDivElement>(null)

  return (
    <DropContainer key={row.id} ref={dropContainer}>
      <RowRenderer
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
    </DropContainer>
  )
}
