import { cn } from '@editor/utils/cn'
import { useEffect, useMemo, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { DraggableAnswerPreview } from './draggable-answer-preview'
import type { PossibleAnswerType } from '../../types'
import { AnswerContent } from '../answer-zone/answer-content'

interface DraggableAnswerProps {
  answer: PossibleAnswerType
  dragType?: string
  originDropzoneId?: string
  isCorrect?: boolean | null
  isAnswerCorrect?: boolean | null
  isOnlyDroppedAnswer?: boolean
  hasEnoughDroppedAnswers?: boolean
}

export type DragItem = PossibleAnswerType &
  Pick<DraggableAnswerProps, 'originDropzoneId'>

export function DraggableAnswer(props: DraggableAnswerProps) {
  const {
    answer,
    dragType = 'undroppableAnswer',
    originDropzoneId,
    isCorrect,
    isAnswerCorrect,
    isOnlyDroppedAnswer = false,
    hasEnoughDroppedAnswers = true,
  } = props
  const { id, imageUrl, text } = answer

  const dragItem = useMemo<DragItem>(
    () => ({ id, originDropzoneId, imageUrl, text }),
    [id, imageUrl, originDropzoneId, text]
  )

  const dragRef = useRef<HTMLSpanElement>(null)
  const [, dragConnector, preview] = useDrag({
    type: dragType,
    item: dragItem,
  })
  dragConnector(dragRef)

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  return (
    <div className="relative inline-block">
      <span
        className={cn(
          'flex max-h-full cursor-grab select-none items-center justify-center',
          getSize(imageUrl, isOnlyDroppedAnswer),
          getBorder(imageUrl, isCorrect, isOnlyDroppedAnswer)
        )}
        ref={dragRef}
      >
        <AnswerContent
          url={imageUrl}
          text={text}
          className={cn(
            'bg-brand-50',
            getAnswerBorder(
              imageUrl,
              isCorrect,
              isAnswerCorrect,
              isOnlyDroppedAnswer,
              hasEnoughDroppedAnswers
            )
          )}
        />
      </span>
      <DraggableAnswerPreview id={id} />
    </div>
  )
}

function getSize(imageUrl: string | undefined, isOnlyAnswer: boolean) {
  if (!imageUrl) return ''
  if (isOnlyAnswer) return 'h-full object-contain'
  return 'h-16 object-contain'
}

function getBorder(
  imageUrl: string | undefined,
  isCorrect: boolean | null | undefined,
  isOnlyAnswer: boolean
) {
  if (imageUrl && isOnlyAnswer) return ''
  if (isCorrect === true || isCorrect === false) return ''
  return 'border-3 border-transparent'
}

function getAnswerBorder(
  imageUrl: string | undefined,
  isCorrect: boolean | null | undefined,
  isAnswerCorrect: boolean | null | undefined,
  isOnlyAnswer: boolean,
  hasEnoughDroppedAnswers: boolean
) {
  if (imageUrl && isOnlyAnswer) return ''
  if (
    isCorrect === true &&
    isAnswerCorrect === true &&
    !hasEnoughDroppedAnswers
  )
    return 'rounded border-3 border-red-500'
  if (isCorrect === true) return 'rounded border-3 border-green-500'
  if (
    isCorrect === false &&
    isAnswerCorrect === true &&
    hasEnoughDroppedAnswers
  )
    return 'rounded border-3 border-green-500'
  if (isCorrect === false) return 'rounded border-3 border-red-500'
  if (imageUrl) return 'rounded border border-brand'
  return ''
}
