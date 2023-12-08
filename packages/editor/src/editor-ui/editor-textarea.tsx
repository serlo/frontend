import { TextareaHTMLAttributes, forwardRef } from 'react'

import { cn } from '@serlo/frontend/src/helper/cn'

type EditorTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  onMoveOutRight?(): void
  onMoveOutLeft?(): void
  className?: string
  dataQa?: string
}

export const EditorTextarea = forwardRef<
  HTMLTextAreaElement,
  EditorTextareaProps
>(function EditorTextarea(
  { onMoveOutLeft, onMoveOutRight, className, dataQa, ...props },
  ref
) {
  return (
    <textarea
      className={cn(
        'm-auto w-full resize-none p-2.5 font-mono shadow-menu outline-none',
        className
      )}
      {...props}
      ref={ref}
      data-qa={dataQa}
      onKeyDown={(e) => {
        if (!ref || typeof ref === 'function' || !ref.current) return

        const { selectionStart, selectionEnd, value } = ref.current

        const selectionCollapsed = selectionStart === selectionEnd
        const caretAtRightEnd = selectionEnd === value.length
        const caretAtLeftEnd = selectionStart === 0

        if (
          e.key === 'ArrowRight' &&
          !e.shiftKey &&
          selectionCollapsed &&
          caretAtRightEnd &&
          typeof onMoveOutRight === 'function'
        ) {
          onMoveOutRight()
        }

        if (
          e.key === 'ArrowLeft' &&
          !e.shiftKey &&
          selectionCollapsed &&
          caretAtLeftEnd &&
          typeof onMoveOutLeft === 'function'
        ) {
          onMoveOutLeft()
        }

        if (e.key === 'ArrowUp' && selectionCollapsed && !caretAtLeftEnd) {
          e.stopPropagation()
        }

        if (e.key === 'ArrowDown' && selectionCollapsed && !caretAtRightEnd) {
          e.stopPropagation()
        }
      }}
    />
  )
})
