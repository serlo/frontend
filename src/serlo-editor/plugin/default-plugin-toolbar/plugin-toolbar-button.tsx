import { forwardRef } from 'react'

import { EditorTooltip } from '../../editor-ui/editor-tooltip'
import { PluginToolbarButtonProps } from '../plugin-toolbar'
import { StyledIconContainer } from './icon-container'

export const PluginToolbarButton = forwardRef<
  HTMLButtonElement,
  PluginToolbarButtonProps
>(function PluginToolbarButton({ className, label, onClick, icon }, ref) {
  return (
    <div>
      <button
        className={`border-0 bg-none ${className ?? ''} serlo-tooltip-trigger`}
        ref={ref}
        onClick={onClick}
      >
        <EditorTooltip text={label} className="-ml-4 !pb-2" />
        <StyledIconContainer aria-hidden="true">{icon}</StyledIconContainer>
      </button>
    </div>
  )
})
