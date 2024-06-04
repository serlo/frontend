import React, { memo, useState } from 'react'
import { useDrop } from 'react-dnd'

import {
  BlankDropZoneSpec,
  DropzoneVisibility,
  PossibleAnswerType,
} from '../../types'
import { AnswerContent } from '../answer-zone/answer-content'

interface BlankDropZoneProps {
  accept: string[]
  onDrop?: (item: BlankDropZoneSpec) => void
  dropZone: BlankDropZoneSpec
  onDropAnswer: (answerId: string, dropzoneId: string) => void
  isCorrect?: boolean | null
  visibility?: DropzoneVisibility
}

export const BlankDropZone = memo(function BlankDropZone({
  dropZone,
  onDropAnswer,
  isCorrect,
  visibility,
}: BlankDropZoneProps) {
  const [droppedAnswers, setDroppedAnswers] = useState<PossibleAnswerType[]>([])

  const { name } = dropZone
  const { left, top } = dropZone.position ?? { left: 0, top: 0 }
  const { height, width } = dropZone.layout ?? { height: 0, width: 0 }

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'all',
    drop: (answer: PossibleAnswerType) => {
      setDroppedAnswers((prev) => [...prev, answer])
      onDropAnswer(answer.id, dropZone.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

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

  const isVisible = visibility === 'full' || visibility === 'partial'

  return (
    <div
      ref={drop}
      className={`absolute flex flex-row items-center justify-center rounded border-${isVisible ? '2' : '0'} p-1 ${isVisible ? backgroundColor : ''} ${isVisible ? borderColor : ''}`}
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
        <AnswerContent key={index} url={answer.imageUrl} text={answer.text} />
      ))}
    </div>
  )
})
