import { ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'

import { CustomDragLayer } from './custom-drag-layer'

export const DndWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <DndProvider
      backend={TouchBackend}
      options={{ enableMouseEvents: true }}
      context={typeof window === 'undefined' ? undefined : window}
    >
      <CustomDragLayer />
      {children}
    </DndProvider>
  )
}
