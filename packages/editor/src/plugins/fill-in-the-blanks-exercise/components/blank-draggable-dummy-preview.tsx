import type { MouseEventHandler } from 'react'

import { cn } from '@/helper/cn'

interface BlankDraggableDummyPreviewProps {
  text: string
  onClick: MouseEventHandler
  onRemove: MouseEventHandler
}

export function BlankDraggableDummyPreview(
  props: BlankDraggableDummyPreviewProps
) {
  const { text, onClick, onRemove } = props

  return (
    <button
      className={cn(
        'relative mb-1 mr-2 flex h-full min-h-8 min-w-[80px] items-center rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2',
        text.length > 0 ? 'justify-around' : 'justify-end'
      )}
      onClick={onClick}
    >
      {text}
      <button
        className={cn(
          'rounded-full px-1 pb-1 leading-4 hover:bg-editor-primary-200',
          text.length > 0 && 'ml-1'
        )}
        onClick={onRemove}
      >
        x
      </button>
    </button>
  )
}
