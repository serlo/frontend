import { forwardRef } from 'react'

import { tw } from '@/helper/tw'

export interface OverlayInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
}

export const OverlayInput = forwardRef<HTMLInputElement, OverlayInputProps>(
  function OverlayInput({ label, ...props }, ref) {
    return (
      <label className="mx-auto mb-0 mt-5 flex items-center justify-between text-almost-black">
        <span className="w-1/5">{label}</span>
        <input
          {...props}
          ref={ref}
          className={tw`
             serlo-input-font-reset w-3/4 rounded-md border-2
           border-editor-primary-100 bg-editor-primary-100
           focus:border-editor-primary focus:outline-none
          `}
        />
      </label>
    )
  }
)
