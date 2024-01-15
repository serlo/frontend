import { ReactNode, useContext } from 'react'
import { useDrop } from 'react-dnd'

import { blankSolutionDragType } from './blank-solution'
import type { BlankId, DraggableId } from '..'
import { FillInTheBlanksContext } from '../context/blank-context'
import { cn } from '@/helper/cn'

interface DroppableBlankProps {
  blankId: BlankId
  isDisabled: boolean
  children: ReactNode
}

export function DroppableBlank(props: DroppableBlankProps) {
  const { blankId, isDisabled, children } = props

  const fillInTheBlanksContext = useContext(FillInTheBlanksContext)

  const [{ isOver }, dropRef] = useDrop({
    accept: blankSolutionDragType,
    drop: ({ draggableId }: { draggableId: DraggableId }) => {
      if (!fillInTheBlanksContext) return
      const newMap = new Map<DraggableId, BlankId>(
        fillInTheBlanksContext.locationOfDraggables.value
      )
      newMap.set(draggableId, blankId)
      fillInTheBlanksContext.locationOfDraggables.set(newMap)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: () => !isDisabled,
  })

  return (
    <span
      className={cn(
        !children &&
          'rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2',
        isOver && !isDisabled && 'bg-slate-400'
      )}
      ref={dropRef}
    >
      {children}
    </span>
  )
}
