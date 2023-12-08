import { useState, useCallback, createRef, useEffect } from 'react'

import type { MathEditorProps } from './editor'
import { EditorTextarea } from '../editor-ui'
import { cn } from '@serlo/frontend/src/helper/cn'

interface MathEditorTextareaProps
  extends Pick<
    MathEditorProps,
    'onChange' | 'onMoveOutLeft' | 'onMoveOutRight'
  > {
  defaultValue: string
  onChange: (value: string) => void
}

export const MathEditorTextarea = (props: MathEditorTextareaProps) => {
  const [latex, setLatex] = useState(props.defaultValue)
  const { onChange } = props
  const parentOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      setLatex(value)
      onChange(value)
    },
    [onChange]
  )

  // Autofocus textarea
  const textareaRef = createRef<HTMLTextAreaElement>()
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea)
      // Timeout is needed because hovering overlay is positioned only after render of this
      setTimeout(() => {
        textarea.focus()
      })
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <EditorTextarea
      className={cn(`
        mx-0 my-1 h-24 !w-[80vw] !max-w-[600px] rounded-md !border-2
        border-transparent text-black !shadow-none focus:border-editor-primary
      `)}
      onChange={parentOnChange}
      onCopy={(e) => e.stopPropagation()}
      onCut={(e) => e.stopPropagation()}
      onMoveOutRight={props.onMoveOutRight}
      onMoveOutLeft={props.onMoveOutLeft}
      value={latex}
      ref={textareaRef}
      dataQa="plugin-math-latex-editor"
    />
  )
}
