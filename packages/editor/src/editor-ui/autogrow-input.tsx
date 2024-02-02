import {
  type KeyboardEventHandler,
  type ChangeEventHandler,
  forwardRef,
} from 'react'

import { cn } from '@/helper/cn'

interface AutogrowInputProps {
  value: string
  size?: number
  className?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onKeyDown: KeyboardEventHandler<HTMLInputElement>
}
export const AutogrowInput = forwardRef<HTMLInputElement, AutogrowInputProps>(
  function AutogrowInput(props, ref) {
    const { value, size, className, onChange, onKeyDown } = props

    return (
      <span className="serlo-autogrow-input" data-value={value + '_ '}>
        <input
          ref={ref}
          className={cn(
            `w-3/4 !min-w-[80px] rounded-full border border-brand bg-brand-50 focus:outline focus:outline-1`,
            className
          )}
          value={value}
          size={size || 4}
          spellCheck={false}
          autoCorrect="off"
          placeholder=""
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </span>
    )
  }
)
