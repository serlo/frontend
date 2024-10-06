import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { cn } from '@editor/utils/cn'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import type { MouseEventHandler, ReactNode } from 'react'

import { FaIcon } from './fa-icon'

interface RemovableInputWrapperProps {
  tooltipText?: string
  children: ReactNode
  onRemoveClick: MouseEventHandler
}

export function RemovableInputWrapper(props: RemovableInputWrapperProps) {
  const { children, tooltipText, onRemoveClick } = props

  return (
    <div className="relative flex items-center">
      {children}
      <button
        className={cn(
          `serlo-tooltip-trigger absolute right-1 h-6 w-6 rounded-full px-1 py-0.5 leading-none text-black
          opacity-50 hover:bg-editor-primary-200 hover:opacity-100 focus:bg-editor-primary-200 focus:opacity-100`
        )}
        onClick={onRemoveClick}
      >
        {tooltipText ? (
          <EditorTooltip text={tooltipText} className="-top-10" />
        ) : null}
        <FaIcon icon={faCircleXmark} className="text-sm" />
      </button>
    </div>
  )
}
