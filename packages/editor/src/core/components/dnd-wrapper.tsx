import { ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

export const DndWrapper = ({ children }: { children: ReactNode }) => {
  if (isTouchDevice()) {
    return (
      <DndProvider
        backend={TouchBackend}
        context={typeof window === 'undefined' ? undefined : window}
      >
        {children}
      </DndProvider>
    )
  }

  return (
    <DndProvider
      backend={HTML5Backend}
      context={typeof window === 'undefined' ? undefined : window}
    >
      {children}
    </DndProvider>
  )
}

function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
