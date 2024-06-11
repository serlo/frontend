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
  isBackgroundTypeImage: boolean
  isCorrect?: boolean | null
  visibility: DropzoneVisibility
  onAnswerDrop: (
    answerId: string,
    dropzoneId: string,
    droppableBlankId?: string
  ) => void
}

export const BlankDropZone = memo(function BlankDropZone(
  props: BlankDropZoneProps
) {
  const {
    dropZone,
    droppedAnswersIds,
    isBackgroundTypeImage,
    isCorrect,
    visibility,
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
        onAnswerDrop(answer.id, id, answer.droppableBlankId)
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

  return (
    <div
      ref={drop}
      className={cn(
        `absolute flex flex-row items-center justify-center rounded p-1`,
        getBackgroundColor(visibility, isOver, canDrop),
        getBorderWidth(visibility, isCorrect),
        getBorderColor(isCorrect),
        getBorderType(visibility)
      )}
      style={{ left, top, height, width }}
      data-qa={`blank-drop-zone-${id}`}
    >
      {visibility !== DropzoneVisibility.None && name ? (
        <div className="absolute left-0 top-0 bg-white p-1 text-xs">{name}</div>
      ) : null}
      {droppedAnswers.map((answer, index) => (
        <DraggableAnswer
          key={index}
          draggableId={answer.id}
          droppableBlankId={id}
          text={answer.text}
          imageUrl={answer.imageUrl}
          isAnswerCorrect={isCorrect || false}
          hasBackgroundColor={isBackgroundTypeImage}
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

function getBorderColor(isCorrect: boolean | null | undefined) {
  if (isCorrect === true) return 'border-green-500'
  if (isCorrect === false) return 'border-red-500'
  return 'border-brand-500'
}

function getBorderWidth(
  visibility: DropzoneVisibility,
  isCorrect: boolean | null | undefined
) {
  if (isCorrect === true || isCorrect === false) return 'border-4'
  if (visibility === DropzoneVisibility.None) return 'border-0'
  return 'border-2'
}

function getBorderType(visibility: DropzoneVisibility) {
  if (visibility === DropzoneVisibility.Full) return 'border-solid'
  return 'border-dashed'
}
