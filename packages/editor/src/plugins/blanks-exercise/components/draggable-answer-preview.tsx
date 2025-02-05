import { cn } from '@editor/utils/cn'
import { useDragLayer } from 'react-dnd'

import type { BlankAnswerDragItem } from './blank-draggable-answer'
import { draggableAnswerStyle } from './draggable-answer-style'

export function DraggableAnswerPreview({
  draggableId,
}: {
  draggableId: string
}) {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem<BlankAnswerDragItem>(),
    currentOffset: monitor.getDifferenceFromInitialOffset(),
    isDragging: monitor.isDragging(),
  }))

  const isExactItemBeingDragged = item && item.draggableId === draggableId

  if (!isDragging || !isExactItemBeingDragged) return null

  const transform = currentOffset
    ? `translate(${currentOffset.x}px, ${currentOffset.y}px)`
    : 'translate(-9999px, -9999px)'

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-50 cursor-grab">
      <div style={{ transform }}>
        <div className={cn(draggableAnswerStyle, 'shadow')}>{item?.text}</div>
      </div>
    </div>
  )
}
