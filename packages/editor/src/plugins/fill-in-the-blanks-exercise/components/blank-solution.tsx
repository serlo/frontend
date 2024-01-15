import { useDrag } from 'react-dnd'

import type { DraggableId } from '..'

export const blankSolutionDragType = 'blank-solution'

export function DraggableSolution(props: {
  text: string
  draggableId: DraggableId
}) {
  const [, dragRef] = useDrag({
    type: blankSolutionDragType,
    item: { draggableId: props.draggableId },
  })

  return (
    <div
      className="inline-block h-full rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2"
      ref={dragRef}
    >
      {props.text}
    </div>
  )
}
