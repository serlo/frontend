import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { cn } from '@/helper/cn'

const imageGalleryType = 'imageGallery'

export function DragAndDropOverlay({
  index,
  onDrop,
  onClick,
}: {
  index: number
  onDrop: (dragIndex: number, hoverIndex: number) => void
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isHovering }, drop] = useDrop({
    accept: imageGalleryType,
    collect: (monitor) => ({ isHovering: monitor.isOver() }),
    drop: (item) => onDrop((item as { index: number }).index, index),
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
          'absolute -left-2.5 bottom-0 top-0 w-1.5 bg-brand-500 transition-opacity',
          isHovering ? 'opacity-100' : 'opacity-0'
        )}
      ></div>
    </div>
  )
}
