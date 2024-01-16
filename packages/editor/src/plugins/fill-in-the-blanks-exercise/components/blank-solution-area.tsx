import { ReactNode } from 'react'
import { useDrop } from 'react-dnd'

import { blankSolutionDragType } from './blank-solution'
import type { DraggableId } from '..'
import { cn } from '@/helper/cn'

interface DraggableSolutionAreaProps {
  children: ReactNode
  onDrop: (item: { draggableId: DraggableId }) => void
}

export function DraggableSolutionArea(props: DraggableSolutionAreaProps) {
  const { onDrop, children } = props

  const [{ isOver }, dropRef] = useDrop({
    accept: blankSolutionDragType,
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
      ref={dropRef}
    >
      {children}
    </div>
  )
}
