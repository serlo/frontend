import clsx from 'clsx'

import { EditableContext } from '../core'

interface PreviewOverlaySimpleProps {
  previewActive: boolean
  fullOpacity: boolean
  children: React.ReactNode
}

export function PreviewOverlaySimple({
  previewActive,
  fullOpacity,
  children,
}: PreviewOverlaySimpleProps) {
  return (
    <div className="relative">
      <div
        className={clsx(
          'absolute top-0 z-20 h-full w-full',
          previewActive ? 'hidden' : 'bg-white bg-opacity-80',
          fullOpacity ? 'bg-opacity-0' : ''
        )}
      />
      {previewActive ? (
        <EditableContext.Provider value={false}>
          {children}
        </EditableContext.Provider>
      ) : (
        children
      )}
    </div>
  )
}
