import React, { memo, useState } from 'react'
import { useDrop } from 'react-dnd'

import { BlankDropZoneSpec, PossibleAnswerType } from '../../types'
import { AnswerContent } from '../AnswerZone/AnswerContent'

interface BlankDropZoneProps {
  accept: string[]
  onDrop?: (item: BlankDropZoneSpec) => void
  dropZone: BlankDropZoneSpec
  onDropAnswer: (answerId: string, dropzoneId: string) => void
  isCorrect?: boolean | null
  isVisible?: boolean
}

export const BlankDropZone = memo(function BlankDropZone({
  dropZone,
  onDropAnswer,
  isCorrect,
  isVisible,
}: BlankDropZoneProps) {
  const [lastDroppedItem, setLastDroppedItem] =
    useState<PossibleAnswerType | null>(null)

  const { name } = dropZone
  const { left, top } = dropZone.position ?? { left: 0, top: 0 }
  const { height, width } = dropZone.layout ?? { height: 0, width: 0 }

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'all',
    drop: (answer: PossibleAnswerType) => {
      setLastDroppedItem(answer)
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

  return (
    <div
      ref={drop}
      className={` absolute cursor-move rounded border-${isVisible ? '2' : '0'} p-1 ${isVisible ? backgroundColor : ''} ${isVisible ? borderColor : ''}`}
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
      <AnswerContent
        url={lastDroppedItem?.imageUrl}
        text={lastDroppedItem?.text}
      />
    </div>
  )
})
