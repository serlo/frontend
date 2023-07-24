import { createPortal } from 'react-dom'
import { Editor as SlateEditor } from 'slate'

import { TextEditorConfig } from '../types'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { PluginToolbarTextControls } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/plugin-toolbar-text-controls'
import { ControlButton } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface TextToolbarProps {
  id: string
  toolbarControls: ControlButton[]
  editor: SlateEditor
  config: TextEditorConfig
  containerRef?: React.RefObject<HTMLDivElement> // The rendered toolbar buttons
}

export function TextToolbar({
  id,
  toolbarControls,
  editor,
  config,
  containerRef,
}: TextToolbarProps) {
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
      pluginId={id}
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
