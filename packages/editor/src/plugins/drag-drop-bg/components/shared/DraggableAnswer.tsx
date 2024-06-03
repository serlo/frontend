// import { useEmptyPreview } from '@editor/core/helpers/use-empty-preview'
import { useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { Descendant } from 'slate'

import type { DraggableAnswerType } from '../../types'
import { AnswerContent } from '../AnswerZone/AnswerContent'
import { cn } from '@/helper/cn'

export const blankDraggableAnswerDragType = 'blank-solution'

interface DraggableAnswerProps {
  text?: Descendant[]
  imageUrl?: string
  draggableId: string
  isAnswerCorrect?: boolean
  canEdit?: boolean
  onClickEdit?: (id: string) => void
}

export function DraggableAnswer({
  draggableId,
  text,
  isAnswerCorrect,
  imageUrl,
}: DraggableAnswerProps) {
  const dragItem = useMemo<DraggableAnswerType>(
    () => ({
      id: draggableId,
      draggableId,
      imageUrl,
      text,
    }),
    [draggableId, imageUrl, text]
  )

  const [collected, dragRef, dragPreview] = useDrag({
    type: 'all',
    item: dragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      hideSourceOnDrag: true,
    }),
  })
  /**
   * Hide source element while dragging
   */
  if (collected.isDragging) {
    return <div ref={dragPreview} />
  }
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
