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
  onMouseMove: () => void
  onMouseLeave: () => void
}

export const PluginMenuItem = forwardRef<
  HTMLButtonElement,
  PluginMenuItemProps
>(function PluginMenuItem(
  {
    item,
    selected,
    tooltipPosition,
    onInsertPlugin,
    onFocus,
    onBlur,
    onMouseMove,
    onMouseLeave,
  },
  ref
) {
  const { pluginType, title, icon, description } = item

  const tooltipClassName = tooltipPosition
    ? tooltipPosition === 'right'
      ? '-left-0'
      : '-right-0'
    : ''

  return (
    <li>
      <button
        data-qa={`plugin-suggestion-${pluginType}`}
        ref={ref}
        onClick={() => onInsertPlugin(pluginType)}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(
          'serlo-tooltip-trigger w-full rounded-md p-2 hover:shadow-xl',
          selected && 'shadow-xl'
        )}
      >
        <EditorTooltip className={tooltipClassName} text={description} />
        {icon || <IconFallback />}
        <b className="mt-2 block text-sm">{title}</b>
      </button>
    </li>
  )
})
