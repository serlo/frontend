import { forwardRef } from 'react'

import { EditorTooltip } from '../editor-ui/editor-tooltip'
import { PluginToolbarButtonProps } from '../plugin-toolbar'
import { Button } from './button'
import { DefaultPluginToolbarConfig } from './config'
import { StyledIconContainer } from './icon-container'

export function createPluginToolbarButton(_config: DefaultPluginToolbarConfig) {
  const PluginToolbarButton = forwardRef<
    HTMLButtonElement,
    PluginToolbarButtonProps
  >(function PluginToolbarButton({ className, label, onClick, icon }, ref) {
    return (
      <div>
        <Button
          className={`${className ?? ''} serlo-tooltip-trigger`}
          ref={ref}
          onClick={onClick}
        >
          <EditorTooltip text={label} className="-ml-4 !pb-2" hideOnHover />
          <StyledIconContainer>{icon}</StyledIconContainer>
        </Button>
      </div>
    )
  })
  return PluginToolbarButton
}
