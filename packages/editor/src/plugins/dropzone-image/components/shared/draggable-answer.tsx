import { useDrag } from 'react-dnd'
import { Descendant } from 'slate'

import { AnswerContent } from '../answer-zone/answer-content'
import { cn } from '@/helper/cn'

export const draggableAnswerDragType = 'draggableAnswer'

interface DraggableAnswerProps {
  draggableId: string
  droppableBlankId?: string
  text?: Descendant[]
  imageUrl?: string
  isAnswerCorrect?: boolean
  hasBackgroundColor?: boolean
}

export function DraggableAnswer({
  draggableId,
  droppableBlankId,
  text,
  imageUrl,
  isAnswerCorrect,
  hasBackgroundColor = false,
}: DraggableAnswerProps) {
  const [, dragRef] = useDrag({
    type: draggableAnswerDragType,
    item: { id: draggableId, droppableBlankId, imageUrl, text },
  })

  return (
    <span
      className={cn(
        'flex cursor-grab items-center justify-center',
        hasBackgroundColor ? 'bg-brand-50' : '',
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
