import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import React, { forwardRef, useContext } from 'react'

import type { PluginMenuItemType } from './add-plugin-modal'
import { PluginSelectionMenuContext } from '../../contexts/plugins-context'
import { cn } from '@/helper/cn'

interface PluginMenuItemProps {
  option: PluginMenuItemType
  selected: boolean
  onSelectPlugin?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
    pluginType: string
  ) => void
  onFocus: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  onBlur: () => void
  tooltipPosition?: 'right' | 'left'
}

export const PluginMenuItem = forwardRef<
  HTMLButtonElement,
  PluginMenuItemProps
>(function PluginMenuItem(props, ref) {
  const {
    option,
    selected,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onBlur,
    tooltipPosition,
  } = props

  const { pluginType, title, icon, description } = option

  const tooltipClassName = tooltipPosition
    ? tooltipPosition === 'right'
      ? '-left-0'
      : '-right-0'
    : ''

  const pContext = useContext(PluginSelectionMenuContext)
  return (
    <button
      data-qa={`plugin-suggestion-${pluginType}`}
      data-active={selected}
      ref={ref}
      onClick={(_e) => pContext.addPlugin(pluginType)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          pContext.addPlugin(pluginType)
        }
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'group serlo-tooltip-trigger flex cursor-auto flex-col items-center rounded-md border border-2 border-transparent pb-0'
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
