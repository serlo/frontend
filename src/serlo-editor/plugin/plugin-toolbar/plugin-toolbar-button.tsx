import { forwardRef } from 'react'

import { EditorTooltip } from '../../editor-ui/editor-tooltip'
import { StyledIconContainer } from './icon-container'

export interface PluginToolbarButtonProps {
  className?: string
  icon: React.ReactNode
  label: string
  ref: React.Ref<HTMLButtonElement>
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const PluginToolbarButton = forwardRef<
  HTMLButtonElement,
  PluginToolbarButtonProps
>(function PluginToolbarButton({ className, label, onClick, icon }, ref) {
  return (
    <button
      className={`serlo-tooltip-trigger border-0 bg-none ${className ?? ''}`}
      ref={ref}
      onClick={onClick}
    >
      <EditorTooltip text={label} className="-ml-4 !pb-2" />
      <StyledIconContainer aria-hidden="true">{icon}</StyledIconContainer>
    </button>
  )
})
