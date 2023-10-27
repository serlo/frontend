import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

export function GapSolutionsArea(props: { children: ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: 'gap-solutions-area',
  })

  return (
    <div
      className="mt-5 min-h-8 w-full rounded-full bg-slate-100"
      ref={setNodeRef}
    >
      {props.children}
    </div>
  )
}
