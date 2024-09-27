import { cn } from '@editor/utils/cn'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const imageGalleryType = 'imageGallery'

export function DragAndDropOverlay({
  index,
  onDrop,
  onClick,
  isLast,
}: {
  index: number
  onDrop: (dragIndex: number, hoverIndex: number) => void
  onClick?: () => void
  isLast?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isHovering }, drop] = useDrop({
    accept: imageGalleryType,
    collect: (monitor) => ({ isHovering: monitor.isOver() }),
    drop: (item: { index: number }) => onDrop(item.index, index),
  })

  const [{ isDragging }, drag] = useDrag({
    type: imageGalleryType,
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        'absolute inset-0 bg-white active:bg-opacity-60',
        isDragging
          ? 'cursor-grabbing bg-opacity-20'
          : 'cursor-grab bg-opacity-0'
      )}
    >
      <div
        className={cn(
          'absolute bottom-0 top-0 w-1.5 bg-brand-500 transition-opacity',
          isHovering ? 'opacity-100' : 'opacity-0',
          isLast ? '-right-2.5' : '-left-2.5'
        )}
      ></div>
    </div>
  )
}
