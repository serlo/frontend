import { ReactNode, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

export const DndWrapper = ({ children }: { children: ReactNode }) => {
  const [hasTouchScreen, setHasTouchScreen] = useState(false)

  // ensure it runs on client (could the same be accomplished with 'use client'
  // directive instead of using the effect?)
  useEffect(() => {
    setHasTouchScreen(isTouchDevice())
  }, [])

  const backend = hasTouchScreen ? TouchBackend : HTML5Backend

  return (
    <DndProvider
      backend={backend}
      context={typeof window === 'undefined' ? undefined : window}
    >
      {children}
    </DndProvider>
  )
}

function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
