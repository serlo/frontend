import { useContext, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

// eslint-disable-next-line import/no-unassigned-import
import 'react-resizable/css/styles.css'

import { AnswerZoneAnswer } from './answer-zone-answer'
import { AnswerZoneEmpty } from './answer-zone-empty'
import { AnswerZoneSidebar } from './answer-zone-sidebar'
import { AnswerZonesContext } from '../../context/context'
import { AnswerType, AnswerZoneState, DropzoneVisibility } from '../../types'
import { getPercentageRounded } from '../../utils/percentage'
import { cn } from '@/helper/cn'

export const answerZoneDragType = 'answerZone'

export interface AnswerZoneProps {
  answerZone: AnswerZoneState
  canvasHeight: number
  canvasWidth: number
  onClick: () => void
  onClickSettingsButton: () => void
  onClickPlusButton: () => void
  onClickEditAnswerButton: (answerIndex: number, answerType: AnswerType) => void
}

export const AnswerZone = (props: AnswerZoneProps) => {
  const {
    answerZone,
    canvasHeight,
    canvasWidth,
    onClick,
    onClickSettingsButton,
    onClickPlusButton,
    onClickEditAnswerButton,
  } = props

  const context = useContext(AnswerZonesContext)

  const { dropzoneVisibility } = context || {}

  const [collected, drag, dragPreview] = useDrag({
    type: answerZoneDragType,
    item: answerZone,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      hideSourceOnDrag: true,
    }),
  })

  const handleResize: ResizableBoxProps['onResize'] = (_, { size }) => {
    const width = getPercentageRounded(canvasWidth, size.width)
    const height = getPercentageRounded(canvasHeight, size.height)
    answerZone.layout.width.set(width)
    answerZone.layout.height.set(height)
  }

  const left = answerZone.position.left.get()
  const top = answerZone.position.top.get()
  const height = answerZone.layout.height.get()
  const width = answerZone.layout.width.get()
  const name = answerZone.name.get()

  const absoluteLeft = canvasWidth * left
  const absoluteTop = canvasHeight * top

  const absoluteHeight = canvasHeight * height
  const absoluteWidth = canvasWidth * width

  const minHeight = Math.max(canvasHeight * 0.09, 45)
  const minWidth = Math.max(canvasHeight * 0.2, 110)

  useEffect(() => {
    if (absoluteHeight < minHeight) {
      answerZone.layout.height.set(minHeight / canvasHeight)
    }
    if (absoluteWidth < minWidth) {
      answerZone.layout.width.set(minWidth / canvasWidth)
    }
    // Only check once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Hide source element while dragging
  if (collected.isDragging) {
    return <div ref={dragPreview} />
  }

  return (
    <div
      ref={dragPreview}
      className="absolute flex cursor-move items-center justify-center rounded bg-transparent"
      onClick={onClick}
      style={{
        left: absoluteLeft,
        top: absoluteTop,
        width: absoluteWidth,
        height: absoluteHeight,
      }}
      data-qa={`answer-zone-${answerZone.id.get()}`}
    >
      <ResizableBox
        className="h-full w-full"
        width={absoluteWidth}
        height={absoluteHeight}
        minConstraints={[minWidth, minHeight]}
        maxConstraints={[canvasWidth, canvasHeight]}
        onResize={handleResize}
        resizeHandles={['se']}
      >
        <div
          ref={drag}
          className={cn(
            `group relative flex h-full w-full
            flex-wrap items-center justify-center gap-1
            border-2 border-blue-500 bg-white`,
            dropzoneVisibility !== DropzoneVisibility.Full && 'border-dashed'
          )}
        >
          {name ? (
            <div className="absolute left-0 top-0 bg-white p-1 text-xs">
              {name}
            </div>
          ) : null}

          {answerZone.answers.length === 0 ? (
            <AnswerZoneEmpty
              answerZoneId={answerZone.id.get()}
              onClickSettingsButton={onClickSettingsButton}
              onClickPlusButton={onClickPlusButton}
            />
          ) : null}

          {answerZone.answers.map((answer, index) => (
            <AnswerZoneAnswer
              key={index}
              answer={answer}
              isOnlyAnswer={answerZone.answers.length === 1}
              onEditAnswer={(answerType: AnswerType) => {
                onClickEditAnswerButton(index, answerType)
              }}
              onRemoveAnswer={() => {
                answerZone.answers.remove(index)
              }}
            />
          ))}

          {answerZone.answers.length > 0 ? (
            <AnswerZoneSidebar
              answerZoneId={answerZone.id.get()}
              onClickSettingsButton={onClickSettingsButton}
              onClickPlusButton={onClickPlusButton}
            />
          ) : null}
        </div>
      </ResizableBox>
    </div>
  )
}
