import clsx from 'clsx'

import { EditableContext } from '../core'

interface PreviewOverlaySimpleProps {
  active: boolean
  fullOpacity: boolean
  children: React.ReactNode
}

export function PreviewOverlaySimple({
  active,
  fullOpacity,
  children,
}: PreviewOverlaySimpleProps) {
  return (
    <div className="relative">
      <div
        className={clsx(
          'absolute top-0 z-20 h-full w-full',
          active ? 'hidden' : 'bg-white bg-opacity-80',
          fullOpacity ? 'bg-opacity-0' : ''
        )}
      />
      {active ? (
        <EditableContext.Provider value={false}>
          {children}
        </EditableContext.Provider>
      ) : (
        children
      )}
    </div>
  )
}
