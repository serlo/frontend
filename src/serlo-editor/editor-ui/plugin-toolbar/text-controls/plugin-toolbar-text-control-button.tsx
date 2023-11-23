import { MouseEventHandler } from 'react'

import { cn } from '@/helper/cn'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'

interface PluginToolbarTextControlButtonProps {
  active?: boolean
  children: React.ReactNode
  tooltipText?: string
  onMouseDown: MouseEventHandler
}

export function PluginToolbarTextControlButton({
  active,
  children,
  tooltipText,
  onMouseDown,
}: PluginToolbarTextControlButtonProps) {
  const [text, hotkeyWithClosingBracket] = tooltipText?.split('(') || [
    undefined,
    undefined,
  ]

  return (
    <button
      className={cn(
        active
          ? 'bg-editor-primary-200 text-almost-black shadow-menu hover:text-black'
          : '#b6b6b6 hover:text-editor-primary',
        'b-0 m-1 h-6 w-6 cursor-pointer rounded p-0 outline-none',
        'serlo-tooltip-trigger'
      )}
      data-qa={`plugin-toolbar-button-${
        text ? text.toLowerCase().trim().replace(/ /g, '-') : ''
      }`}
      onMouseDown={onMouseDown}
    >
      <EditorTooltip
        text={text}
        hotkeys={hotkeyWithClosingBracket?.slice(0, -1)}
        className="top-8"
      />
      {children}
    </button>
  )
}
