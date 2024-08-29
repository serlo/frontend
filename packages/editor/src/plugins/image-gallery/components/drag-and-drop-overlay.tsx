import { useRef, useState } from 'react'
import { XYCoord, useDrag, useDrop } from 'react-dnd'

import { cn } from '@/helper/cn'

interface DragAndDropImage {
  id: string
  index: number
}

function getHoverPosition(
  clientOffset: XYCoord | null,
  hoverBoundingRect: DOMRect
) {
  if (!clientOffset) return null
  const hoverClientX = clientOffset.x - hoverBoundingRect.left
  const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

  return hoverClientX < hoverMiddleX ? 'left' : 'right'
}

export function DragAndDropOverlay({
  id,
  index,
  onDrop,
  onClick,
}: {
  id: string
  index: number
  onDrop: (dragIndex: number, hoverIndex: number) => void
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hoverPosition, setHoverPosition] = useState<'left' | 'right' | null>(
    null
  )

  const [{ isHovering }, drop] = useDrop<
    DragAndDropImage,
    void,
    { isHovering: boolean }
  >({
    accept: 'all',
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
    }),
    drop: (item) => {
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex || !hoverPosition) return
      const targetIndex = hoverPosition === 'left' ? hoverIndex : hoverIndex + 1
      onDrop(dragIndex, targetIndex)
    },
    hover: (item, monitor) => {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const newHoverPosition = getHoverPosition(
        monitor.getClientOffset(),
        ref.current.getBoundingClientRect()
      )

      if (newHoverPosition !== hoverPosition) {
        setHoverPosition(newHoverPosition)
      }
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'all',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        'absolute inset-0',
        isDragging ? 'opacity-20' : 'opacity-100'
      )}
    >
      <div
        className={cn(
          'absolute bottom-0 top-0 w-1.5 bg-brand-500 opacity-0 transition-opacity',
          isHovering && hoverPosition === 'left' && '-left-2.5',
          isHovering && hoverPosition === 'right' && '-right-2.5',
          isHovering && 'opacity-100'
        )}
      ></div>
    </div>
  )
}
