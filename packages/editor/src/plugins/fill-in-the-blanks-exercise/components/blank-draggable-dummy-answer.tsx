import {
  type ChangeEventHandler,
  type MouseEventHandler,
  useEffect,
  useState,
} from 'react'

import { BlankDraggableDummyInput } from './blank-draggable-dummy-input'
import { BlankDraggableDummyPreview } from './blank-draggable-dummy-preview'

interface BlankDraggableDummyAnswerProps {
  text: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onRemove: MouseEventHandler
}

export function BlankDraggableDummyAnswer(
  props: BlankDraggableDummyAnswerProps
) {
  const { text, onChange, onRemove } = props

  const [isInEditMode, setIsInEditMode] = useState(false)

  useEffect(() => {
    setIsInEditMode(true)
  }, [])

  return isInEditMode ? (
    <BlankDraggableDummyInput
      text={text}
      onBlur={() => {
        setIsInEditMode(false)
      }}
      onChange={onChange}
    />
  ) : (
    <BlankDraggableDummyPreview
      text={text}
      switchToEditMode={() => {
        setIsInEditMode(true)
      }}
      onRemove={onRemove}
    />
  )
}
