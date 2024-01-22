import { ReactNode } from 'react'
import { useDrop } from 'react-dnd'

import { blankDraggableAnswerDragType } from './blank-draggable-answer'
import type { DraggableId } from '..'
import { cn } from '@/helper/cn'

interface BlankDraggableAreaProps {
  children: ReactNode
  onDrop: (item: { draggableId: DraggableId }) => void
}

export function BlankDraggableArea(props: BlankDraggableAreaProps) {
  const { onDrop, children } = props

  const [{ isOver }, dropRef] = useDrop({
    accept: blankDraggableAnswerDragType,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div
      className={cn(
        'mt-5 flex min-h-8 w-full items-stretch rounded-full bg-slate-100',
        isOver ? 'bg-slate-200' : ''
      )}
      data-qa="blank-solution-area"
      ref={dropRef}
    >
      {children}
    </div>
  )
}
