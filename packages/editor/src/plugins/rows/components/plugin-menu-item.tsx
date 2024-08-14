import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { forwardRef } from 'react'

import type { PluginMenuItemType } from '../contexts/plugin-menu/types'
import { cn } from '@/helper/cn'

interface PluginMenuItemProps {
  item: PluginMenuItemType
  selected: boolean
  tooltipPosition?: 'right' | 'left'
  onInsertPlugin: (pluginType: EditorPluginType) => void
  onFocus: () => void
  onBlur: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const PluginMenuItem = forwardRef<
  HTMLButtonElement,
  PluginMenuItemProps
>(function PluginMenuItem(props, ref) {
  const {
    item,
    selected,
    tooltipPosition,
    onInsertPlugin,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
  } = props

  const { pluginType, title, icon, description } = item

  const tooltipClassName = tooltipPosition
    ? tooltipPosition === 'right'
      ? '-left-0'
      : '-right-0'
    : ''

  return (
    <button
      data-qa={`plugin-suggestion-${pluginType}`}
      data-active={selected}
      ref={ref}
      onClick={() => onInsertPlugin(pluginType)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onInsertPlugin(pluginType)
          e.preventDefault()
        }
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'group serlo-tooltip-trigger flex cursor-auto flex-col items-center rounded-md border border-0 border-transparent pb-0'
      )}
    >
      <EditorTooltip className={tooltipClassName} text={description} />
      <span
        className={cn(
          'w-full cursor-pointer rounded-md p-2 hover:shadow-xl',
          selected && 'shadow-xl'
        )}
      >
        <span className="flex w-full items-center justify-center rounded-md">
          {icon || <IconFallback className="h-full w-full" />}
        </span>
        <h5 className="mt-2 text-center text-sm font-bold">{title}</h5>
      </span>
    </button>
  )
})
