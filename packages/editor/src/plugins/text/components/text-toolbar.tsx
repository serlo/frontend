import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { PluginToolbarTextControls } from '@editor/editor-ui/plugin-toolbar/text-controls/plugin-toolbar-text-controls'
import { ControlButton } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { createPortal } from 'react-dom'
import { useSlate } from 'slate-react'

import type { TextEditorConfig } from '../types/config'

interface TextToolbarProps {
  id: string
  toolbarControls: ControlButton[]
  config: TextEditorConfig
  containerRef?: React.RefObject<HTMLDivElement> // The rendered toolbar buttons
}

export function TextToolbar({
  id,
  toolbarControls,
  config,
  containerRef,
}: TextToolbarProps) {
  const editor = useSlate()

  if (config.isInlineChildEditor) {
    if (!containerRef || !containerRef.current) return null
    const target = containerRef.current
      .closest('.plugin-wrapper-container')
      ?.querySelector('.toolbar-controls-target')
    if (!target) return null

    return createPortal(
      <PluginToolbarTextControls controls={toolbarControls} editor={editor} />,
      target
    )
  }

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Text}
      contentControls={
        <PluginToolbarTextControls controls={toolbarControls} editor={editor} />
      }
      pluginControls={
        config.isInlineChildEditor ? undefined : (
          <PluginDefaultTools pluginId={id} />
        )
      }
    />
  )
}
