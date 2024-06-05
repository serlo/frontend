import { LegacyRef, ReactNode } from 'react'
import { useDrop } from 'react-dnd'

import { cn } from '@/helper/cn'

interface DraggableAreaProps {
  children: ReactNode
  accept: string
  onDrop?: (item: any) => void
}

export function DraggableArea(props: DraggableAreaProps) {
  const { onDrop, accept, children } = props

  const [{ isOver }, dropRef] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div
      className={cn(
        'mx-side mb-6 mt-side flex min-h-8 flex-wrap items-stretch gap-2 rounded-xl bg-slate-100 p-side',
        isOver ? 'bg-slate-200' : ''
      )}
      data-qa="blank-solution-area"
      ref={dropRef as LegacyRef<HTMLDivElement>}
    >
      {children}
    </div>
  )
}
