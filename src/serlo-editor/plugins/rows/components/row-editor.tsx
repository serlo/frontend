import { useRef } from 'react'

import type { RowsPluginConfig, RowsPluginState } from '..'
import { EditorRowRenderer } from '../editor-renderer'
import { StateTypeReturnType } from '@/serlo-editor/plugin'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'

interface RowEditorProps {
  config: RowsPluginConfig
  index: number
  rows: StateTypeReturnType<RowsPluginState>
  row: StateTypeReturnType<RowsPluginState>[0]
}

export function RowEditor({ config, index, row, rows }: RowEditorProps) {
  const plugins = editorPlugins.getAllWithData()
  const dropContainer = useRef<HTMLDivElement>(null)

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
    </div>
  )
}
