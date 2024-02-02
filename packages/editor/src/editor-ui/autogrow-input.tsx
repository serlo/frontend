import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  type ComponentProps,
} from 'react'

import { cn } from '@/helper/cn'

export const AutogrowInput = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'>
>(function AutogrowInput(props, ref) {
  const { value, size, className, onChange, onKeyDown, onBlur } = props

  const localRef = useRef<HTMLInputElement | null>(null)
  const [cursor, setCursor] = useState<number | null>(null)

  // Persists the cursor position across re-renders
  useEffect(() => {
    localRef.current?.setSelectionRange(cursor, cursor)
  }, [ref, cursor, value])

  return (
    <span className="serlo-autogrow-input" data-value={String(value) + '_ '}>
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
        onChange={(event) => {
          setCursor(event.target.selectionStart)
          onChange?.(event)
        }}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    </span>
  )
})
