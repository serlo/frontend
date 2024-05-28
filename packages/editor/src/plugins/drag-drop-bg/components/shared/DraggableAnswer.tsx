import { useEmptyPreview } from '@editor/core/helpers/use-empty-preview'
import { useMemo } from 'react'
import { useDrag } from 'react-dnd'

import { AnswerImage } from './AnswerImage'
import { AnswerText } from './AnswerText'
import type { DraggableAnswerType } from '../../types'
import { cn } from '@/helper/cn'

export const blankDraggableAnswerDragType = 'blank-solution'

interface DraggableAnswerProps {
  text?: string
  imageUrl?: string
  draggableId: string
  isAnswerCorrect?: boolean
  canEdit?: boolean
  onClickEdit?: (id: string) => void
}

export function DraggableAnswer({
  draggableId,
  text,
  isAnswerCorrect,
  imageUrl,
  // canEdit = false,
  // onClickEdit,
}: DraggableAnswerProps) {
  const dragItem = useMemo<DraggableAnswerType>(
    () => ({
      id: draggableId,
      draggableId,
      imageUrl,
      text,
    }),
    [draggableId, imageUrl, text]
  )

  const [, dragRef, preview] = useDrag({
    type: 'all',
    item: dragItem,
  })
  useEmptyPreview(preview)

  return (
    <span
      className={cn(
        'cursor-grab bg-brand-50',
        isAnswerCorrect ? 'border-green-500' : '',
        isAnswerCorrect === false ? 'border-red-500' : ''
      )}
      ref={dragRef}
    >
      {imageUrl && <AnswerImage isPreview url={imageUrl} />}
      {text && <AnswerText text={text} />}
      {/* {!imageUrl && !text && canEdit && (
        <div className="flex h-full flex-col items-center justify-center">
          <button
            onClick={() => onClickEdit && onClickEdit(draggableId)}
            className="rounded bg-orange-100 p-2"
          >
            +
          </button>
        </div>
      )} */}
    </span>
  )
}
