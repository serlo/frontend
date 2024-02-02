import {
  type KeyboardEventHandler,
  type ChangeEventHandler,
  type ChangeEvent,
  forwardRef,
  useRef,
  useState,
  useEffect,
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

    const localRef = useRef<HTMLInputElement | null>(null)
    const [cursor, setCursor] = useState<number | null>(null)

    // Persists the cursor position across re-renders
    useEffect(() => {
      localRef.current?.setSelectionRange(cursor, cursor)
    }, [ref, cursor, value])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setCursor(event.target.selectionStart)
      onChange(event)
    }

    return (
      <span className="serlo-autogrow-input" data-value={value + '_ '}>
        <input
          // Assign the input to both the local and the passed on ref
          ref={(node) => {
            localRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
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
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
      </span>
    )
  }
)
