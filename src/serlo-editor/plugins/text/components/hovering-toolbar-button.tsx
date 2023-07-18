import clsx from 'clsx'
import { MouseEventHandler } from 'react'

import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'

// TODO: Rename to "PluginToolbarButton" and maybe move to core,
// once the plugin toolbar has been fully implemented
export function HoveringToolbarButton({
  active,
  children,
  tooltipText,
  onMouseDown,
}: {
  active?: boolean
  children: React.ReactNode
  tooltipText?: string
  onMouseDown: MouseEventHandler
}) {
  const textParts = tooltipText?.split('(')

  return (
    <button
      className={clsx(
        active
          ? 'bg-editor-primary-200 text-almost-black shadow-menu hover:text-black'
          : '#b6b6b6 hover:text-editor-primary',
        'b-0 m-1 h-6 w-6 cursor-pointer rounded p-0 outline-none',
        'serlo-tooltip-trigger'
      )}
      onMouseDown={onMouseDown}
    >
      <EditorTooltip
        text={textParts?.[0]}
        hotkeys={textParts?.[1]?.slice(0, -1)}
      />
      {children}
    </button>
  )
}
