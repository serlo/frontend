import { useDrag } from 'react-dnd'

import type { DraggableId } from '..'

export const blankSolutionDragType = 'blank-solution'

interface DraggableSolutionProps {
  text: string
  draggableId: DraggableId
}

export function DraggableSolution(props: DraggableSolutionProps) {
  const { draggableId, text } = props

  const [, dragRef] = useDrag({
    type: blankSolutionDragType,
    item: { draggableId },
  })

  return (
    <span
      className="rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2"
      ref={dragRef}
    >
      {text}
    </span>
  )
}
