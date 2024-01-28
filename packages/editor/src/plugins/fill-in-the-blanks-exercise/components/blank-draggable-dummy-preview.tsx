import type { MouseEventHandler } from 'react'

import { cn } from '@/helper/cn'

interface BlankDraggableDummyPreviewProps {
  text: string
  switchToEditMode: () => void
  onRemove: MouseEventHandler
}

export function BlankDraggableDummyPreview(
  props: BlankDraggableDummyPreviewProps
) {
  const { text, switchToEditMode, onRemove } = props

  return (
    <div className="relative mb-1 mr-2 flex ">
      <button
        className="min-h-8 min-w-[80px] rounded-full border border-editor-primary-300 bg-editor-primary-100 pl-2 pr-6"
        onClick={switchToEditMode}
        onFocus={switchToEditMode}
      >
        {text}
      </button>
      <div className="absolute bottom-0 right-1 top-0">
        <button
          className={cn(
            'rounded-full px-1 pb-1 leading-4 hover:bg-editor-primary-200',
            text.length > 0 && 'ml-1'
          )}
          onClick={onRemove}
        >
          x
        </button>
      </div>
    </div>
  )
}
