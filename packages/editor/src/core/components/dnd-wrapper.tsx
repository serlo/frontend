import { ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import { isTouchDevice } from '../helpers/is-touch-device'

export const DndWrapper = ({ children }: { children: ReactNode }) =>
  isTouchDevice() ? (
    <DndProvider
      backend={TouchBackend}
      context={window}
      // There is a not so encouraging warning here
      // https://react-dnd.github.io/react-dnd/docs/backends/touch
      // > NOTE: This is
      // > buggy due to the difference in touchstart/touchend event propagation
      // >compared to mousedown/mouseup/click.
      options={{ enableMouseEvents: true }}
    >
      {children}
    </DndProvider>
  ) : (
    <DndProvider
      backend={HTML5Backend}
      context={typeof window === 'undefined' ? undefined : window}
    >
      {children}
    </DndProvider>
  )
