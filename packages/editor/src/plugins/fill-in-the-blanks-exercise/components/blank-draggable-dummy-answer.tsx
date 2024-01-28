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
  isInHoverMode: boolean
  onMouseEnter: MouseEventHandler
  onChange: ChangeEventHandler<HTMLInputElement>
  onRemove: MouseEventHandler
}

export function BlankDraggableDummyAnswer(
  props: BlankDraggableDummyAnswerProps
) {
  const { text, isInHoverMode, onMouseEnter, onChange, onRemove } = props

  const [isInEditMode, setIsInEditMode] = useState(false)

  useEffect(() => {
    setIsInEditMode(true)
  }, [])

  function handleInputBlur() {
    setIsInEditMode(false)
  }

  function handlePreviewClick() {
    setIsInEditMode(true)
  }

  return isInEditMode ? (
    <BlankDraggableDummyInput
      text={text}
      onBlur={handleInputBlur}
      onChange={onChange}
    />
  ) : (
    <BlankDraggableDummyPreview
      text={text}
      isInHoverMode={isInHoverMode}
      onMouseEnter={onMouseEnter}
      onClick={handlePreviewClick}
      onRemove={onRemove}
    />
  )
}
