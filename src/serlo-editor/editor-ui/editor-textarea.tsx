import clsx from 'clsx'
import { TextareaHTMLAttributes, forwardRef } from 'react'

import { IgnoreKeys } from '../core'

type EditorTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  onMoveOutRight?(): void
  onMoveOutLeft?(): void
  className?: string
}

export const EditorTextarea = forwardRef<
  HTMLTextAreaElement,
  EditorTextareaProps
>(function EditorTextarea(
  { onMoveOutLeft, onMoveOutRight, className, ...props },
  ref
) {
  return (
    <IgnoreKeys except={['up', 'down']} className="w-full">
      <textarea
        className={clsx(
          'm-auto w-full resize-none p-2.5 font-mono shadow-menu outline-none',
          className
        )}
        {...props}
        ref={ref}
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
    </IgnoreKeys>
  )
})
