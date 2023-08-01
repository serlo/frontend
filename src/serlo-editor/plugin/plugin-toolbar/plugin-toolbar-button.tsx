import { forwardRef } from 'react'

import { EditorTooltip } from '../../editor-ui/editor-tooltip'
import { tw } from '@/helper/tw'

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
      <div
        className={tw`
          flex h-7 w-7 cursor-pointer items-center justify-center
          rounded-full text-almost-black hover:bg-editor-primary-200 [&>svg]:!m-0 `}
        aria-hidden="true"
      >
        {icon}
      </div>
    </button>
  )
})
