import { cn } from '@editor/utils/cn'
import { forwardRef } from 'react'

export interface OverlayInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
  autoFocus?: boolean
  tooltip?: JSX.Element
}

export const OverlayInput = forwardRef<HTMLInputElement, OverlayInputProps>(
  function OverlayInput({ label, autoFocus, tooltip, ...props }, ref) {
    return (
      <label className="mx-auto mb-0 mt-5 flex items-center justify-between text-almost-black">
        <span className="w-1/5">{label}</span>
        {tooltip && <span className="w-25 ml-[-25px]">{tooltip}</span>}
        <input
          autoFocus={autoFocus}
          {...props}
          ref={ref}
          className={cn(`
             serlo-input-font-reset w-3/4 rounded-md border-2
           border-editor-primary-100 bg-editor-primary-100
           focus:border-editor-primary focus:outline-none
          `)}
        />
      </label>
    )
  }
)
