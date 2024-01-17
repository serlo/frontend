import { ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const DndWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <DndProvider
      backend={HTML5Backend}
      context={typeof window === 'undefined' ? undefined : window}
    >
      {children}
    </DndProvider>
  )
}
