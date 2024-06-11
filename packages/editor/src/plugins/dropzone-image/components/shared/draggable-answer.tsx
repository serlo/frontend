import { useDrag } from 'react-dnd'

import type { PossibleAnswerType } from '../../types'
import { AnswerContent } from '../answer-zone/answer-content'
import { cn } from '@/helper/cn'

export const draggableAnswerDragType = 'draggableAnswer'

interface DraggableAnswerProps {
  answer: PossibleAnswerType
  droppableBlankId?: string
  isAnswerCorrect?: boolean | null
  isOnlyDroppedAnswer?: boolean
}

export function DraggableAnswer(props: DraggableAnswerProps) {
  const {
    answer,
    droppableBlankId,
    isAnswerCorrect,
    isOnlyDroppedAnswer = false,
  } = props
  const { id, imageUrl, text } = answer

  const [, dragRef] = useDrag({
    type: draggableAnswerDragType,
    item: { id, droppableBlankId, imageUrl, text },
  })

  return (
    <span
      className={cn(
        'flex cursor-grab items-center justify-center',
        getSize(imageUrl, isOnlyDroppedAnswer),
        getBorder(imageUrl, isAnswerCorrect, isOnlyDroppedAnswer)
      )}
      ref={dragRef}
    >
      <AnswerContent
        url={imageUrl}
        text={text}
        className={getAnswerBorder(
          imageUrl,
          isAnswerCorrect,
          isOnlyDroppedAnswer
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
  isAnswerCorrect: boolean | null | undefined,
  isOnlyAnswer: boolean
) {
  if (imageUrl && isOnlyAnswer) return ''
  if (isAnswerCorrect === true || isAnswerCorrect === false) return ''
  return 'border-3 border-transparent'
}

function getAnswerBorder(
  imageUrl: string | undefined,
  isAnswerCorrect: boolean | null | undefined,
  isOnlyAnswer: boolean
) {
  if (isOnlyAnswer) return ''
  if (isAnswerCorrect === true) return 'rounded border-3 border-green-500'
  if (isAnswerCorrect === false) return 'rounded border-3 border-red-500'
  if (imageUrl) return 'rounded border border-brand'
  return ''
}
