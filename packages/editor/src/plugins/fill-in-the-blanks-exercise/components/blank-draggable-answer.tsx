import { useDrag } from 'react-dnd'

import type { DraggableId } from '..'
import { cn } from '@/helper/cn'

export const blankDraggableAnswerDragType = 'blank-solution'

interface BlankDraggableAnswerProps {
  text: string
  draggableId: DraggableId
  isAnswerCorrect?: boolean
}

export function BlankDraggableAnswer(props: BlankDraggableAnswerProps) {
  const { draggableId, text, isAnswerCorrect } = props

  const [, dragRef] = useDrag({
    type: blankDraggableAnswerDragType,
    item: { draggableId },
  })

  return (
    <span
      className={cn(
        'rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2',
        isAnswerCorrect && 'border-green-500',
        isAnswerCorrect === false && 'border-red-500'
      )}
      ref={dragRef}
    >
      {text}
    </span>
  )
}
