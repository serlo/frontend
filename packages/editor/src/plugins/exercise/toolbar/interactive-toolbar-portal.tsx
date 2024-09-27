import { createPortal } from 'react-dom'

export function InteractiveToolbarPortal({
  containerRef,
  children,
}: {
  containerRef?: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}) {
  if (!containerRef || !containerRef.current) return null
  const target = containerRef.current
    .closest('.plugin-exercise')
    ?.querySelector('.exercise-toolbar-interactive-target')
  if (!target) return null

  return createPortal(
    <div className="flex">
      <div className="mr-2 h-6 w-[2px] bg-gray-300"></div>
      {children}
    </div>,
    target
  )
}
