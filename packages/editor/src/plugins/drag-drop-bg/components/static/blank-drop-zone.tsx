import React, { memo, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'

import {
  BlankDropZoneSpec,
  DraggableAnswerType,
  DropzoneVisibility,
  PossibleAnswerType,
} from '../../types'
import { DraggableAnswer } from '../shared/draggable-answer'
import { cn } from '@/helper/cn'

interface BlankDropZoneProps {
  accept: string[]
  onDrop?: (item: BlankDropZoneSpec) => void
  dropZone: BlankDropZoneSpec
  droppedAnswersIds: string[]
  onAnswerDrop: (
    answerId: string,
    dropzoneId: string,
    droppableBlankId?: string
  ) => void
  isCorrect?: boolean | null
  visibility?: DropzoneVisibility
}

export const BlankDropZone = memo(function BlankDropZone({
  dropZone,
  droppedAnswersIds,
  onAnswerDrop,
  isCorrect,
  visibility,
}: BlankDropZoneProps) {
  const [droppedAnswers, setDroppedAnswers] = useState<PossibleAnswerType[]>([])

  const { name } = dropZone
  const { left, top } = dropZone.position ?? { left: 0, top: 0 }
  const { height, width } = dropZone.layout ?? { height: 0, width: 0 }

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'all',
    drop: (answer: DraggableAnswerType) => {
      const hasAnswerAlready = droppedAnswers.find(
        (droppedAnswer) => droppedAnswer.id === answer.id
      )
      if (!hasAnswerAlready) {
        setDroppedAnswers((prev) => [...prev, answer])
        onAnswerDrop(answer.id, dropZone.id, answer.droppableBlankId)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  useEffect(() => {
    setDroppedAnswers((prev) => {
      return prev.filter((answer) => droppedAnswersIds.includes(answer.id))
    })
  }, [droppedAnswersIds])

  const isActive = isOver && canDrop
  const backgroundColor = isActive
    ? 'bg-brand-400'
    : canDrop
      ? 'bg-brand-200'
      : 'bg-white'
  const borderColor =
    isCorrect === true
      ? 'border-green-500'
      : isCorrect === false
        ? 'border-red-500'
        : 'border-brand-500'

  const isVisible =
    visibility === DropzoneVisibility.Full ||
    visibility === DropzoneVisibility.Partial

  return (
    <div
      ref={drop}
      className={cn(
        `absolute flex flex-row items-center justify-center rounded p-1
        ${visibility === DropzoneVisibility.Partial ? 'border-dashed' : 'border-solid'}
        ${isVisible ? 'border-2' : 'border-0'}
        ${isVisible ? backgroundColor : ''}
        ${isVisible ? borderColor : ''}`
      )}
      style={{
        left,
        top,
        height,
        width,
      }}
      data-qa={`blank-drop-zone-${dropZone.id}`}
    >
      {isVisible && name && name.length > 0 && (
        <div className="absolute left-0 top-0 bg-white p-1 text-xs">{name}</div>
      )}
      {droppedAnswers.map((answer, index) => (
        <DraggableAnswer
          key={index}
          draggableId={answer.id}
          droppableBlankId={dropZone.id}
          text={answer.text}
          imageUrl={answer.imageUrl}
          isAnswerCorrect={isCorrect || false}
        />
      ))}
    </div>
  )
})
