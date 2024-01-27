import { ChangeEventHandler, useEffect, useRef, useState } from 'react'

import { cn } from '@/helper/cn'

interface BlankDraggableDummyAnswerProps {
  text: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export function BlankDraggableDummyAnswer(
  props: BlankDraggableDummyAnswerProps
) {
  const { text, onChange } = props

  const [isInEditMode, setIsInEditMode] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setIsInEditMode(true)
  }, [])

  return isInEditMode ? (
    <span className="serlo-autogrow-input mb-1 mr-2" data-value={text + '_'}>
      <input
        className={cn(
          'rounded-full border border-editor-primary-300 bg-editor-primary-100'
        )}
        ref={inputRef}
        value={text}
        autoFocus
        size={4}
        onBlur={() => {
          setIsInEditMode(false)
        }}
        onChange={onChange}
      />
    </span>
  ) : (
    <span
      className={cn(
        'mb-1 mr-2 rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2',
        text.length < 1 && 'px-8'
      )}
      onClick={() => {
        setIsInEditMode(true)
      }}
    >
      {text}
    </span>
  )
}
