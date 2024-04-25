/* eslint-disable no-duplicate-imports */
import type { FC } from 'react'
import { memo, useState } from 'react'
import { useDrop } from 'react-dnd'

import { answerZoneStyle } from '../../styles'
import { BlankDropZoneSpec, PossibleAnswerType } from '../../types'
import { AnswerImage } from '../shared/AnswerImage'

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

    const { left, top } = dropZone.position ?? {
      left: 0,
      top: 0,
    }

    const { height, width } = dropZone.layout ?? {
      height: 0,
      width: 0,
    }

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
    let backgroundColor = 'white'
    if (isActive) {
      backgroundColor = 'darkgrey'
    } else if (canDrop) {
      backgroundColor = 'lightgrey'
    }

    let borderColor = 'black'
    if (isCorrect === true) {
      borderColor = 'green'
    } else if (isCorrect === false) {
      borderColor = 'red'
    }

    return (
      <div
        ref={drop}
        style={{
          ...answerZoneStyle,
          backgroundColor,
          borderColor,
          left,
          top,
          height,
          width,
        }}
        data-testid="dustbin"
      >
        {lastDroppedItem && <AnswerImage url={lastDroppedItem.imageUrl} />}
      </div>
    )
  }
)
