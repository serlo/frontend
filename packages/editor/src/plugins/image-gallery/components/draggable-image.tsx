import { useRef, useState } from 'react'
import { DropTargetMonitor, XYCoord, useDrag, useDrop } from 'react-dnd'

import { cn } from '@/helper/cn'

interface DraggableImageProps {
  id: string
  index: number
  onMovePhoto?: (dragIndex: number, hoverIndex: number) => void
  style?: React.CSSProperties
  onClick?: () => void
  children: React.ReactNode
}

interface DraggablePhoto {
  id: string
  index: number
}

export function DraggableImage({
  id,
  index,
  onMovePhoto,
  style,
  onClick,
  children,
}: DraggableImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hoverPosition, setHoverPosition] = useState<'left' | 'right' | null>(
    null
  )

  const calculateHoverPosition = (
    monitor: DropTargetMonitor,
    hoverBoundingRect: DOMRect
  ) => {
    const clientOffset = monitor.getClientOffset() as XYCoord
    const hoverClientX = clientOffset.x - hoverBoundingRect.left
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

    return hoverClientX < hoverMiddleX ? 'left' : 'right'
  }

  const [{ isHovering }, drop] = useDrop<
    DraggablePhoto,
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
      if (!onMovePhoto || dragIndex === hoverIndex || !hoverPosition) return
      const targetIndex = hoverPosition === 'left' ? hoverIndex : hoverIndex + 1
      onMovePhoto(dragIndex, targetIndex)
    },
    hover: (item, monitor) => {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const newHoverPosition = calculateHoverPosition(
        monitor,
        hoverBoundingRect
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
      className={cn(
        'relative flex-grow p-2',
        isDragging ? 'opacity-20' : 'opacity-100'
      )}
      style={style}
      onClick={onClick}
    >
      <div
        className={cn(
          'absolute bottom-0 top-0 w-1.5 bg-brand-500 opacity-0 transition-opacity',
          isHovering && hoverPosition === 'left' && '-left-[3px]',
          isHovering && hoverPosition === 'right' && '-right-[3px]',
          isHovering && 'opacity-100'
        )}
      ></div>
      {children}
    </div>
  )
}
