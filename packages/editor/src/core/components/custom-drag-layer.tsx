import {
  BlankAnswerDragItem,
  blankDraggableAnswerDragType,
  dragAnswerStyle,
} from '@editor/plugins/fill-in-the-blanks-exercise/components/blank-draggable-answer'
import { useDragLayer } from 'react-dnd'

import { cn } from '@/helper/cn'

interface DragItem extends BlankAnswerDragItem {
  type: string
  id: string
}

export function CustomDragLayer() {
  const { itemType, isDragging, item, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem<DragItem>(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  )

  if (!isDragging) {
    return null
  }

  const transform = currentOffset
    ? `translate(${currentOffset.x}px, ${currentOffset.y}px)`
    : 'translate(-9999px, -9999px)'

  function renderItem() {
    switch (itemType) {
      case blankDraggableAnswerDragType:
        return (
          <div className={cn('rounded p-2 shadow', dragAnswerStyle)}>
            {item?.text}
          </div>
        )
      default: {
        // eslint-disable-next-line no-console
        console.warn('Trying to render an unknown drag type!', { itemType })
        return null
      }
    }
  }

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50">
      <div style={{ transform }} className="">
        {renderItem()}
      </div>
    </div>
  )
}
