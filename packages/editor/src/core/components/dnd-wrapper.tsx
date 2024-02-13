'use client'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { ReactNode } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'

import { CustomDragLayer } from './custom-drag-layer'

export const DndWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <DndProvider
      options={HTML5toTouch}
      context={typeof window === 'undefined' ? undefined : window}
    >
      <CustomDragLayer />
      {children}
    </DndProvider>
  )
}
