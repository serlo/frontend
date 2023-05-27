import clsx from 'clsx'
import { MouseEventHandler } from 'react'

import { EditorTooltip } from '@/serlo-editor-repo/editor-ui/editor-tooltip'

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
          ? 'text-almost-black shadow-menu bg-editor-primary-200 hover:text-black'
          : '#b6b6b6 hover:text-editor-primary',
        'cursor-pointer outline-none h-6 b-0 rounded m-[5px] p-0 w-6',
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
