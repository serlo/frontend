import clsx from 'clsx'

import { EditableContext } from '../core'

interface PreviewOverlayProps {
  showOverlay: boolean
  children: React.ReactNode
  editable?: boolean
}

export function PreviewOverlay({
  showOverlay,
  editable,
  children,
}: PreviewOverlayProps) {
  return (
    <div className="relative">
      <div
        className={clsx(
          'absolute top-0 z-20 h-full w-full bg-white bg-opacity-80',
          showOverlay && 'hidden'
        )}
      ></div>
      {!editable ? (
        <EditableContext.Provider value={false}>
          {children}
        </EditableContext.Provider>
      ) : (
        children
      )}
    </div>
  )
}
