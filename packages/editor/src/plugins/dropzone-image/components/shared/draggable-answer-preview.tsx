import { useDragLayer } from 'react-dnd'

import type { DragItem } from './draggable-answer'
import { AnswerContent } from '../answer-zone/answer-content'

export function DraggableAnswerPreview({ id }: { id: string }) {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem<DragItem>(),
    currentOffset: monitor.getDifferenceFromInitialOffset(),
    isDragging: monitor.isDragging(),
  }))

  const isExactItemBeingDragged = item && item.id === id

  if (!isDragging || !isExactItemBeingDragged) return null

  const { text, imageUrl } = item

  const transform = currentOffset
    ? `translate(${currentOffset.x}px, ${currentOffset.y}px)`
    : 'translate(-9999px, -9999px)'

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-50 cursor-grab">
      <div style={{ transform }}>
        <AnswerContent url={imageUrl} text={text} />
      </div>
    </div>
  )
}
