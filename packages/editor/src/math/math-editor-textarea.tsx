import { cn } from '@serlo/frontend/src/helper/cn'
import { createRef, useEffect, useState } from 'react'

import type { MathEditorProps } from './editor.jsx'

interface MathEditorTextareaProps
  extends Pick<MathEditorProps, 'onMoveOutLeft' | 'onMoveOutRight' | 'state'> {
  onChange: (value: string) => void
}

export const MathEditorTextarea = ({
  state: latex,
  onChange,
  onMoveOutLeft,
  onMoveOutRight,
}: MathEditorTextareaProps) => {
  const [value, setValue] = useState(latex)

  // Autofocus textarea
  const textareaRef = createRef<HTMLTextAreaElement>()
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    // Timeout is needed because hovering overlay is positioned only after render of this
    setTimeout(() => textarea.focus())
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <textarea
      className={cn(
        `mx-0 my-1 h-24 w-[80vw] max-w-[600px] resize-none rounded-md
        border-2 border-transparent p-2.5 font-mono
        text-black outline-none focus:border-editor-primary`
      )}
      ref={textareaRef}
      onChange={(e) => {
        setValue(e.currentTarget.value)
        onChange(e.currentTarget.value)
      }}
      onCopy={(e) => e.stopPropagation()}
      onCut={(e) => e.stopPropagation()}
      value={value}
      data-qa="plugin-math-latex-editor"
      onKeyDown={(e) => {
        const { selectionStart, selectionEnd, value } = e.currentTarget

        const selectionCollapsed = selectionStart === selectionEnd
        if (!selectionCollapsed) return

        const caretAtRightEnd = selectionEnd === value.length
        const caretAtLeftEnd = selectionStart === 0

        if (e.shiftKey) return
        if (e.key === 'ArrowRight' && caretAtRightEnd) onMoveOutRight?.()
        if (e.key === 'ArrowLeft' && caretAtLeftEnd) onMoveOutLeft?.()
      }}
    />
  )
}
