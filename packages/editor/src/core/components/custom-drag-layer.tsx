import {
  BlankAnswerDragItem,
  blankDraggableAnswerDragType,
  dragAnswerStyle,
} from '@editor/plugins/blanks-exercise/components/blank-draggable-answer'
import { cn } from '@editor/utils/cn'
import { useDragLayer } from 'react-dnd'

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
        // Trying to render an unknown drag type. This is the case when handling
        // the preview within the component that calls `useDrag`. For mobile
        // support of a preview, it's better to use the `use-empty-preview` hook
        // and render the preview here.
        return null
      }
    }
  }

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 cursor-grab">
      <div style={{ transform }}>{renderItem()}</div>
    </div>
  )
}
