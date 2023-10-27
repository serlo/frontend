import { useDroppable } from '@dnd-kit/core'

export function GapSolutionsArea(props: { children: JSX.Element }) {
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
