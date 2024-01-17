import { useDrag } from 'react-dnd'

import type { DraggableId } from '..'
import { cn } from '@/helper/cn'

export const blankSolutionDragType = 'blank-solution'

interface DraggableSolutionProps {
  text: string
  draggableId: DraggableId
  isAnswerCorrect?: boolean
}

export function DraggableSolution(props: DraggableSolutionProps) {
  const { draggableId, text, isAnswerCorrect } = props

  const [, dragRef] = useDrag({
    type: blankSolutionDragType,
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
