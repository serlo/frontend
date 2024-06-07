import { useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { Descendant } from 'slate'

import type { DraggableAnswerType } from '../../types'
import { AnswerContent } from '../answer-zone/answer-content'
import { cn } from '@/helper/cn'

export const draggableAnswerDragType = 'draggableAnswer'

interface DraggableAnswerProps {
  text?: Descendant[]
  imageUrl?: string
  draggableId: string
  droppableBlankId?: string
  isAnswerCorrect?: boolean
}

export function DraggableAnswer({
  draggableId,
  droppableBlankId,
  text,
  isAnswerCorrect,
  imageUrl,
}: DraggableAnswerProps) {
  const dragItem = useMemo<DraggableAnswerType>(
    () => ({
      id: draggableId,
      draggableId,
      droppableBlankId,
      imageUrl,
      text,
    }),
    [draggableId, droppableBlankId, imageUrl, text]
  )

  const [, dragRef] = useDrag({
    type: draggableAnswerDragType,
    item: dragItem,
  })
  return (
    <span
      className={cn(
        'flex cursor-grab items-center justify-center bg-brand-50',
        isAnswerCorrect ? 'border-green-500' : '',
        isAnswerCorrect === false ? 'border-red-500' : '',
        imageUrl ? 'rounded border border-brand' : 'p-1'
      )}
      ref={dragRef}
    >
      <AnswerContent url={imageUrl} text={text} isPreview />
    </span>
  )
}
