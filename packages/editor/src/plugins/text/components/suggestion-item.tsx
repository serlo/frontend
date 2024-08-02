import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import React, { forwardRef } from 'react'

import { SuggestionOption } from '../hooks/use-suggestions'
import { cn } from '@/helper/cn'

interface SuggestionItemProps {
  option: SuggestionOption
  selected: boolean
  onClick: (event: React.MouseEvent) => void
  onFocus: () => void
}

export const SuggestionItem = forwardRef<
  HTMLButtonElement,
  SuggestionItemProps
>(({ option, selected, onClick, onFocus }, ref) => {
  const { pluginType, title, icon, description } = option

  return (
    <button
      data-qa={`plugin-suggestion-${pluginType}`}
      data-active={selected}
      ref={ref}
      onClick={onClick}
      onFocus={onFocus}
      className={cn(
        'group serlo-tooltip-trigger flex cursor-auto flex-col items-center rounded-md border border-2 border-transparent pb-0'
      )}
    >
      <EditorTooltip text={description} />
      <div
        className={cn(
          'w-full cursor-pointer rounded-md p-2 hover:shadow-suggestions ',
          selected && 'shadow-suggestions'
        )}
      >
        <div
          className={cn('flex w-full items-center justify-center rounded-md')}
        >
          {icon || <IconFallback className="h-full w-full" />}
        </div>
        <h5 className="mt-2 text-center text-sm font-bold">{title}</h5>
      </div>
    </button>
  )
})

SuggestionItem.displayName = 'SuggestionItem'
