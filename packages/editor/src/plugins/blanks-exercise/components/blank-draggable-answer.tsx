import { useEmptyPreview } from '@editor/core/helpers/use-empty-preview'
import { useMemo } from 'react'
import { useDrag } from 'react-dnd'

import type { DraggableId } from '..'
import { cn } from '@/helper/cn'

export const blankDraggableAnswerDragType = 'blank-solution'

interface BlankDraggableAnswerProps {
  text: string
  draggableId: DraggableId
  isAnswerCorrect?: boolean
}

export interface BlankAnswerDragItem {
  draggableId: DraggableId
  text: string
}

export const dragAnswerStyle =
  'cursor-grab rounded-full border border-brand bg-brand-50 px-2'

export function BlankDraggableAnswer(props: BlankDraggableAnswerProps) {
  const { draggableId, text, isAnswerCorrect } = props

  const dragItem = useMemo<BlankAnswerDragItem>(
    () => ({ draggableId, text }),
    [draggableId, text]
  )

  const [, dragRef, preview] = useDrag({
    type: blankDraggableAnswerDragType,
    item: dragItem,
  })
  useEmptyPreview(preview)

  return (
    <span
      className={cn(
        dragAnswerStyle,
        isAnswerCorrect && 'border-green-500',
        isAnswerCorrect === false && 'border-red-500'
      )}
      ref={dragRef}
    >
      {text}
    </span>
  )
}
