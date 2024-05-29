/* eslint-disable no-duplicate-imports */
import type { FC } from 'react'
import { memo, useState } from 'react'
import { useDrop } from 'react-dnd'

import { BlankDropZoneSpec, PossibleAnswerType } from '../../types'
import { AnswerImage } from '../shared/AnswerImage'
import { AnswerText } from '../shared/AnswerText'

export interface BlankDropZoneProps {
  accept: string[]
  onDrop?: (item: BlankDropZoneSpec) => void
  dropZone: BlankDropZoneSpec
  onDropAnswer: (answerId: string, dropzoneId: string) => void
  isCorrect?: boolean | null
}

export const BlankDropZone: FC<BlankDropZoneProps> = memo(
  function BlankDropZone({ dropZone, onDropAnswer, isCorrect }) {
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
      ? 'bg-gray-700'
      : canDrop
        ? 'bg-gray-300'
        : 'bg-white'
    const borderColor =
      isCorrect === true
        ? 'border-green-500'
        : isCorrect === false
          ? 'border-red-500'
          : 'border-black'

    const isImageAnswer = lastDroppedItem?.imageUrl
    const isTextAnswer = lastDroppedItem?.text
    return (
      <div
        ref={drop}
        className={`absolute cursor-move rounded border-2 p-1 ${backgroundColor} ${borderColor}`}
        style={{
          left,
          top,
          height,
          width,
        }}
        data-qa={`blank-drop-zone-${dropZone.id}`}
      >
        {name && name.length > 0 && (
          <div className="absolute left-0 top-0 bg-white p-1 text-xs">
            {name}
          </div>
        )}
        {isImageAnswer && <AnswerImage url={lastDroppedItem.imageUrl} />}
        {isTextAnswer && <AnswerText text={lastDroppedItem.text} />}
      </div>
    )
  }
)
