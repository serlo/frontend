import { cn } from '@editor/utils/cn'
import { ReactNode, useRef } from 'react'
import { useDrop } from 'react-dnd'

interface DraggableAreaProps {
  children: ReactNode
  accept: string
  className?: string
  onDrop?: (item: any) => void
}

export function DraggableArea(props: DraggableAreaProps) {
  const { children, accept, className, onDrop } = props

  const dropRef = useRef<HTMLDivElement>(null)
  const [{ isOver }, dropConnector] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })
  dropConnector(dropRef)

  return (
    <div
      className={cn(
        'mb-6 mt-side flex min-h-8 flex-wrap items-stretch gap-2 rounded-xl bg-slate-100 p-side',
        isOver ? 'bg-slate-200' : '',
        className
      )}
      data-qa="blank-solution-area"
      ref={dropRef}
    >
      {children}
    </div>
  )
}
