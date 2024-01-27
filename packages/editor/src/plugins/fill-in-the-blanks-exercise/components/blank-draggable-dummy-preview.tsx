import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useState, type MouseEventHandler } from 'react'

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

  const [isInHoverMode, setIsInHoverMode] = useState(false)

  function handleMouseEnter() {
    setIsInHoverMode(true)
  }

  function handleMouseLeave() {
    setTimeout(() => {
      setIsInHoverMode(false)
    }, 300)
  }

  return (
    <div
      className="mb-1 mr-2 flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
          className="ml-2 rounded-full bg-red-temp px-2"
          onClick={onRemove}
        >
          <FaIcon icon={faTrashCan} className="text-sm" />
        </button>
      ) : null}
    </div>
  )
}
