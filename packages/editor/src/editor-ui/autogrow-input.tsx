import { cn } from '@editor/utils/cn'
import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  type ComponentProps,
} from 'react'

export const AutogrowInput = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'>
>(function AutogrowInput(props, ref) {
  const { value, size, className, onChange, ...rest } = props

  const localRef = useRef<HTMLInputElement | null>(null)
  const [cursor, setCursor] = useState<number | null>(null)

  // Persists the cursor position across re-renders
  useEffect(() => {
    localRef.current?.setSelectionRange(cursor, cursor)
  }, [ref, cursor, value])

  return (
    /* heavily inspired by Shaw (https://css-tricks.com/auto-growing-inputs-textareas/#aa-other-ideas)
       this needs a data-value on the wrapping element equal to the value of the input
    */
    <span
      className={cn(
        'serlo-autogrow-input relative inline-grid',
        'after:w-auto after:min-w-16 after:resize-none after:resize-none after:px-3 after:[grid-area:1_/_2]',
        "after:invisible after:-ml-2 after:whitespace-pre-wrap after:content-[attr(data-value)_'_']"
      )}
      data-value={String(value) + '_ '}
    >
      <input
        // Assign the input to both the local and the passed on ref
        ref={(node) => {
          localRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className={cn(
          'w-auto min-w-[80px] resize-none rounded-full px-3 [grid-area:1_/_2]',
          'border border-brand bg-brand-50 focus:outline focus:outline-1',
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
        {...rest}
      />
    </span>
  )
})
