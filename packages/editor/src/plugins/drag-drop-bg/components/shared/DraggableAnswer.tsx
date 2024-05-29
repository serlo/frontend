import { useEmptyPreview } from '@editor/core/helpers/use-empty-preview'
import { useMemo } from 'react'
import { useDrag } from 'react-dnd'

import type { DraggableAnswerType } from '../../types'
import { AnswerContent } from '../AnswerZone/AnswerContent'
import { cn } from '@/helper/cn'

export const blankDraggableAnswerDragType = 'blank-solution'

interface DraggableAnswerProps {
  text?: string
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

  const [, dragRef, preview] = useDrag({
    type: 'all',
    item: dragItem,
  })
  useEmptyPreview(preview)

  return (
    <span
      className={cn(
        'cursor-grab bg-brand-50',
        isAnswerCorrect ? 'border-green-500' : '',
        isAnswerCorrect === false ? 'border-red-500' : '',
        text || imageUrl ? 'rounded border border-brand' : 'p-1'
      )}
      ref={dragRef}
    >
      <AnswerContent url={imageUrl} text={text} isPreview />
    </span>
  )
}
