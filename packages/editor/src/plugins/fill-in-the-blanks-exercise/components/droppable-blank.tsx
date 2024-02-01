import { ReactNode, useContext } from 'react'
import { useDrop } from 'react-dnd'

import { blankDraggableAnswerDragType } from './blank-draggable-answer'
import type { BlankId, DraggableId } from '..'
import { FillInTheBlanksContext } from '../context/blank-context'
import { cn } from '@/helper/cn'

interface DroppableBlankProps {
  blankId: BlankId
  children: ReactNode
}

export function DroppableBlank(props: DroppableBlankProps) {
  const { blankId, children } = props

  const fillInTheBlanksContext = useContext(FillInTheBlanksContext)

  const [{ isOver }, dropRef] = useDrop({
    accept: blankDraggableAnswerDragType,
    drop: ({ draggableId }: { draggableId: DraggableId }) => {
      if (!fillInTheBlanksContext) return
      const newMap = new Map<DraggableId, BlankId>(
        [...fillInTheBlanksContext.locationOfDraggables.value].filter(
          (item) => item[1] !== blankId
        )
      )
      newMap.set(draggableId, blankId)
      fillInTheBlanksContext.locationOfDraggables.set(newMap)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <span
      className={cn(
        'relative rounded-full border',
        !children && 'border-brand bg-brand-50 px-6 text-brand-50',
        isOver && 'bg-slate-400 text-slate-400'
      )}
      ref={dropRef}
    >
      {children || '_'}
      {children && isOver ? (
        <span className="absolute bottom-0 left-[1px] right-[1px] top-0 block rounded-full bg-slate-400 opacity-80"></span>
      ) : null}
    </span>
  )
}
