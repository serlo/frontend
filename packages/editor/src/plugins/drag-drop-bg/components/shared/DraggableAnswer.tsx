import { useEmptyPreview } from '@editor/core/helpers/use-empty-preview'
import { useMemo } from 'react'
import { useDrag } from 'react-dnd'

import { AnswerImage } from './AnswerImage'
import { AnswerText } from './AnswerText'
import type { DraggableAnswerType } from '../../types'
import { plusButtonStyle } from '../answer-zone/styles'
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

export const dragAnswerStyle =
  'cursor-grab rounded-full border border-brand bg-brand-50 px-2'

export function DraggableAnswer(props: DraggableAnswerProps) {
  const {
    draggableId,
    text,
    isAnswerCorrect,
    imageUrl,
    canEdit = false,
    onClickEdit,
  } = props

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
        isAnswerCorrect && 'border-green-500',
        isAnswerCorrect === false && 'border-red-500'
      )}
      ref={dragRef}
    >
      {imageUrl && <AnswerImage isPreview url={imageUrl} />}
      {text && <AnswerText text={text} />}
      {!imageUrl && !text && canEdit && (
        <button
          onClick={() => onClickEdit && onClickEdit(draggableId)}
          style={plusButtonStyle}
        >
          +
        </button>
      )}
    </span>
  )
}
