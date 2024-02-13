import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { ReactNode } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'

import { CustomDragLayer } from './custom-drag-layer'
import { isTouchDevice } from '../helpers/is-touch-device'

export const DndWrapper = ({ children }: { children: ReactNode }) => {
  const isTouch = isTouchDevice()

  return (
    <DndProvider
      options={HTML5toTouch}
      context={typeof window === 'undefined' ? undefined : window}
    >
      {isTouch && <CustomDragLayer />}
      {children}
    </DndProvider>
  )
}
