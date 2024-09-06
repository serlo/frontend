import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { PluginToolbarTextControls } from '@editor/editor-ui/plugin-toolbar/text-controls/plugin-toolbar-text-controls'
import { ControlButton } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { useSlate } from 'slate-react'

import { AiAutocompleteContext } from '../ai-autocomplete-context'
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
  const { enabled, setEnabled } = useContext(AiAutocompleteContext)
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
      pluginSettings={
        <>
          <div className="mx-1 text-sm font-bold">KI Autocomplete</div>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            backgroundImageChecked="#9747FF"
            backgroundImageUnchecked="inherit"
          />
        </>
      }
      pluginControls={
        config.isInlineChildEditor ? undefined : (
          <PluginDefaultTools pluginId={id} />
        )
      }
    />
  )
}

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  backgroundImageChecked?: string
  backgroundImageUnchecked?: string
}

function Switch({
  checked,
  onChange,
  backgroundImageChecked,
  backgroundImageUnchecked,
}: SwitchProps) {
  const switchStyle = {
    width: '40px',
    height: '20px',
    borderRadius: '10px',
    border: '2px solid black',
    backgroundColor: checked
      ? backgroundImageChecked
      : backgroundImageUnchecked,
    cursor: 'pointer',
    transition: 'background 0.3s',
  }

  const handleStyle = {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: 'black',
    position: 'relative',
    top: '0px',
    left: checked ? '20px' : '2px',
    transition: 'left 0.3s',
  } as const

  return (
    <button
      onClick={() => onChange(!checked)}
      style={switchStyle}
      className="mx-2"
    >
      <div style={handleStyle}></div>
    </button>
  )
}
