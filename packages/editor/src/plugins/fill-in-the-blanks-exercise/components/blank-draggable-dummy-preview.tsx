import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import type { MouseEventHandler } from 'react'

import { cn } from '@/helper/cn'

interface BlankDraggableDummyPreviewProps {
  text: string
  isInHoverMode: boolean
  onMouseEnter: MouseEventHandler
  onClick: MouseEventHandler
  onRemove: MouseEventHandler
}

export function BlankDraggableDummyPreview(
  props: BlankDraggableDummyPreviewProps
) {
  const { text, isInHoverMode, onMouseEnter, onClick, onRemove } = props

  return (
    <div className="mb-1 mr-2 flex min-h-8" onMouseEnter={onMouseEnter}>
      <button
        className={cn(
          'relative h-full rounded-full border border-editor-primary-300 bg-editor-primary-100',
          text.length < 1 ? 'px-8' : 'px-2'
        )}
        onClick={onClick}
      >
        <span className={cn(isInHoverMode && 'opacity-20')}>{text}</span>
        <span
          className={cn(
            'absolute bottom-0 left-0 right-0 top-0 text-center',
            !isInHoverMode && 'opacity-0'
          )}
        >
          <FaIcon icon={faPencil} className="text-sm" />
        </span>
      </button>

      {isInHoverMode ? (
        <button
          className="ml-2 rounded-full bg-red-400 px-2"
          onClick={onRemove}
        >
          <FaIcon icon={faTrashCan} className="text-sm" />
        </button>
      ) : null}
    </div>
  )
}
