import React, { memo, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'

import {
  type BlankDropZoneSpec,
  type DraggableAnswerType,
  DropzoneVisibility,
  type PossibleAnswerType,
} from '../../types'
import {
  DraggableAnswer,
  draggableAnswerDragType,
} from '../shared/draggable-answer'
import { cn } from '@/helper/cn'

interface BlankDropZoneProps {
  dropZone: BlankDropZoneSpec
  droppedAnswersIds: string[]
  isCorrect?: boolean | null
  isAnswerCorrectMap?: Map<string, boolean | null> | null
  visibility: DropzoneVisibility
  answersCount: number
  onAnswerDrop: (
    answerId: string,
    dropzoneId: string,
    originDropzoneId?: string
  ) => void
}

export const BlankDropZone = memo(function BlankDropZone(
  props: BlankDropZoneProps
) {
  const {
    dropZone,
    droppedAnswersIds,
    isCorrect,
    isAnswerCorrectMap,
    visibility,
    answersCount,
    onAnswerDrop,
  } = props
  const { id, name, position, layout } = dropZone
  const { left, top } = position
  const { height, width } = layout

  const [droppedAnswers, setDroppedAnswers] = useState<PossibleAnswerType[]>([])

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: draggableAnswerDragType,
    drop: (answer: DraggableAnswerType) => {
      const hasAnswerAlready = droppedAnswers.find(
        (droppedAnswer) => droppedAnswer.id === answer.id
      )
      if (!hasAnswerAlready) {
        setDroppedAnswers((prev) => [...prev, answer])
        onAnswerDrop(answer.id, id, answer.originDropzoneId)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  useEffect(() => {
    setDroppedAnswers((prev) =>
      prev.filter((answer) => droppedAnswersIds.includes(answer.id))
    )
  }, [droppedAnswersIds])

  const hasOnlyOneAnswer = droppedAnswers.length === 1
  const isOnlyAnswerTypeImage = hasOnlyOneAnswer && !!droppedAnswers[0].imageUrl
  const isSmallScreen = () => window.innerWidth < 1024
  const scaler = isSmallScreen() ? 0.4 : 1

  return (
    <div
      ref={drop}
      className={cn(
        `absolute flex flex-wrap items-center justify-center gap-2 rounded p-0`,
        getBackgroundColor(visibility, isOver, canDrop),
        getBorderWidth(visibility, isCorrect, isOnlyAnswerTypeImage),
        getBorderColor(isCorrect, isOnlyAnswerTypeImage),
        getBorderType(visibility)
      )}
      style={{
        left: left * scaler,
        top: top * scaler,
        width: width * scaler,
        height: height * scaler,
      }}
      data-qa={`blank-drop-zone-${id}`}
    >
      {visibility !== DropzoneVisibility.None && name ? (
        <div className="absolute left-0 top-0 bg-white p-1 text-xs">{name}</div>
      ) : null}
      {droppedAnswers.map((answer, index) => (
        <DraggableAnswer
          key={index}
          answer={answer}
          originDropzoneId={id}
          isCorrect={isCorrect}
          isAnswerCorrect={isAnswerCorrectMap?.get(answer.id)}
          isOnlyDroppedAnswer={hasOnlyOneAnswer}
          hasEnoughDroppedAnswers={droppedAnswers.length === answersCount}
        />
      ))}
    </div>
  )
})

function getBackgroundColor(
  visibility: DropzoneVisibility,
  isOver: boolean,
  canDrop: boolean
) {
  if (visibility !== DropzoneVisibility.Full) return ''
  if (isOver && canDrop) return 'bg-brand-400'
  if (canDrop) return 'bg-brand-200'
  return 'bg-white'
}

function getBorderWidth(
  visibility: DropzoneVisibility,
  isCorrect: boolean | null | undefined,
  isOnlyAnswerTypeImage: boolean
) {
  if ((isCorrect === true || isCorrect === false) && isOnlyAnswerTypeImage)
    return 'border-4'
  if (visibility === DropzoneVisibility.None) return 'border-0'
  return 'border-2'
}

function getBorderColor(
  isCorrect: boolean | null | undefined,
  isOnlyAnswerTypeImage: boolean
) {
  if (isCorrect === true && isOnlyAnswerTypeImage) return 'border-green-500'
  if (isCorrect === false && isOnlyAnswerTypeImage) return 'border-red-500'
  return 'border-brand-500'
}

function getBorderType(visibility: DropzoneVisibility) {
  if (visibility === DropzoneVisibility.Full) return 'border-solid'
  return 'border-dashed'
}
