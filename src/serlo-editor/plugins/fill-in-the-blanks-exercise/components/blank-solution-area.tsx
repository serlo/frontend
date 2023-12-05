// import { useDroppable } from '@dnd-kit/core'
// import { ReactNode } from 'react'

import { ReactNode } from 'react'
import { useDrop } from 'react-dnd'

import type { BlankId, DraggableId } from '..'
import { cn } from '@/helper/cn'

// export function BlankSolutionsArea(props: { children: ReactNode }) {
//   const { setNodeRef } = useDroppable({
//     id: 'blank-solutions-area',
//   })

//   return (
//     <div
//       className="mt-5 min-h-8 w-full rounded-full bg-slate-100"
//       ref={setNodeRef}
//     >
//       {props.children}
//     </div>
//   )
// }

export function DraggableSolutionArea(props: {
  children: ReactNode
  locationOfDraggables: {
    value: Map<DraggableId, BlankId>
    set: React.Dispatch<React.SetStateAction<Map<DraggableId, BlankId>>>
  }
}) {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'blank-solution',
    drop: (item: { draggableId: DraggableId }) => {
      const newMap = new Map<DraggableId, BlankId>(
        props.locationOfDraggables.value
      )
      newMap.delete(item.draggableId)
      props.locationOfDraggables.set(newMap)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })
  return (
    <div
      className={cn(
        'mt-5 min-h-8 w-full rounded-full bg-slate-100',
        isOver ? 'bg-slate-200' : ''
      )}
      ref={dropRef}
    >
      {props.children}
    </div>
  )
}
