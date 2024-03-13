import { ReactNode, useContext } from 'react'
import { useDrop } from 'react-dnd'

import { blankDraggableAnswerDragType } from './blank-draggable-answer'
import type { BlankId, DraggableId } from '..'
import { BlanksContext } from '../context/blank-context'
import { cn } from '@/helper/cn'

interface DroppableBlankProps {
  blankId: BlankId
  children: ReactNode
}

export function DroppableBlank(props: DroppableBlankProps) {
  const { blankId, children } = props

  const context = useContext(BlanksContext)

  const [{ isOver }, dropRef] = useDrop({
    accept: blankDraggableAnswerDragType,
    drop: ({ draggableId }: { draggableId: DraggableId }) => {
      if (!context) return

      let originDragBlank, replacedDraggableId

      const newMap = new Map<DraggableId, BlankId>(
        // Filtering logic for replacing/swapping already filled blanks
        [...context.locationOfDraggables.value].filter((item) => {
          // If the dropped draggable is found in one of the blanks, save that blank's ID
          if (item[0] === draggableId) originDragBlank = item[1]
          // If the target blank already has a draggable, save the replaced draggable's ID
          if (item[1] === blankId) replacedDraggableId = item[0]
          // Remove the replaced draggable from the map
          return item[1] !== blankId
        })
      )

      newMap.set(draggableId, blankId)

      if (originDragBlank && replacedDraggableId) {
        newMap.set(replacedDraggableId, originDragBlank)
      }

      context.locationOfDraggables.set(newMap)

      context.isFeedbackVisible.set(false)
      context.feedbackForBlanks.set(
        new Map<BlankId, { isCorrect: boolean | undefined }>()
      )
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
