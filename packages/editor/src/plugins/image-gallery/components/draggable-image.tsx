import React, { useRef, useState, useMemo } from 'react'
import { DropTargetMonitor, XYCoord, useDrag, useDrop } from 'react-dnd'

import { cn } from '@/helper/cn'

export interface DraggableImageProps {
  id: string
  index: number
  onMovePhoto?: (dragIndex: number, hoverIndex: number) => void
  className?: string
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
  className,
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

    if (hoverClientX < hoverMiddleX) return 'left'
    if (hoverClientX > hoverMiddleX) return 'right'
    return null
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

  const combinedClassName = useMemo(
    () =>
      cn(className, {
        'border-l-dashed border-l-4 border-l-brand-500':
          isHovering && hoverPosition === 'left',
        'border-r-dashed border-r-4 border-r-brand-500':
          isHovering && hoverPosition === 'right',
        'shadow-md': isHovering,
        'rotate-5 transform': isDragging,
      }),
    [className, isHovering, hoverPosition, isDragging]
  )

  const opacity = isDragging ? 0.5 : 1

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={combinedClassName}
      style={{ ...style, opacity }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
