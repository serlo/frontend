import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { ReactNode, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'

import { CustomDragLayer } from './custom-drag-layer'

export const DndWrapper = ({ children }: { children: ReactNode }) => {
  // replace with 'use client' directive once it leaves Canary, see
  // https://react.dev/reference/react/use-client
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Render nothing until the component is mounted client-side
    return null
  }

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
