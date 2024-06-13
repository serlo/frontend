import { useDrag } from 'react-dnd'

import type { PossibleAnswerType } from '../../types'
import { AnswerContent } from '../answer-zone/answer-content'
import { cn } from '@/helper/cn'

export const draggableAnswerDragType = 'draggableAnswer'

interface DraggableAnswerProps {
  answer: PossibleAnswerType
  originDropzoneId?: string
  isCorrect?: boolean | null
  isAnswerCorrect?: boolean | null
  isOnlyDroppedAnswer?: boolean
  hasEnoughDroppedAnswers?: boolean
}

export function DraggableAnswer(props: DraggableAnswerProps) {
  const {
    answer,
    originDropzoneId,
    isCorrect,
    isAnswerCorrect,
    isOnlyDroppedAnswer = false,
    hasEnoughDroppedAnswers = true,
  } = props
  const { id, imageUrl, text } = answer

  const [, dragRef] = useDrag({
    type: draggableAnswerDragType,
    item: { id, originDropzoneId, imageUrl, text },
  })

  return (
    <span
      className={cn(
        'flex max-h-full cursor-grab items-center justify-center',
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
