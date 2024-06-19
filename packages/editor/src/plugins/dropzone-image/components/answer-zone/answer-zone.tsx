import { useContext, useEffect, useState } from 'react'
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

interface PositionState {
  left: number
  top: number
  width: number
  height: number
}

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
  const left = answerZone.position.left.get()
  const top = answerZone.position.top.get()
  const height = answerZone.layout.height.get()
  const width = answerZone.layout.width.get()
  const name = answerZone.name.get()

  const [positionState, setPositionState] = useState<PositionState>({
    left: canvasWidth * left,
    top: canvasHeight * top,
    width: canvasWidth * width,
    height: canvasHeight * height,
  })
  useEffect(() => {
    setPositionState({
      left: canvasWidth * left,
      top: canvasHeight * top,
      width: canvasWidth * width,
      height: canvasHeight * height,
    })
  }, [canvasHeight, canvasWidth, height, left, top, width])

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

  const handleResize: ResizableBoxProps['onResize'] = (_, { size, handle }) => {
    setPositionState((previous) => {
      const newPositionState = { ...previous }

      if (handle === 'nw' || handle === 'sw') {
        const newLeft = previous.left + previous.width - size.width
        const isOverflowingLeft = newLeft < 0
        newPositionState.left = isOverflowingLeft ? 0 : newLeft
        newPositionState.width = isOverflowingLeft ? previous.width : size.width
      } else {
        const newRight = previous.left + size.width
        const isOverflowingRight = newRight > canvasWidth
        newPositionState.width = isOverflowingRight
          ? previous.width
          : size.width
      }

      if (handle === 'nw' || handle === 'ne') {
        const newTop = previous.top + previous.height - size.height
        const isOverflowingTop = newTop < 0
        newPositionState.top = isOverflowingTop ? 0 : newTop
        newPositionState.height = isOverflowingTop
          ? previous.height
          : size.height
      } else {
        const newBottom = previous.top + size.height
        const isOverflowingBottom = newBottom > canvasHeight
        newPositionState.height = isOverflowingBottom
          ? previous.height
          : size.height
      }

      return newPositionState
    })
  }

  const handleResizeStop: ResizableBoxProps['onResizeStop'] = () => {
    const left = getPercentageRounded(canvasWidth, positionState.left)
    const top = getPercentageRounded(canvasHeight, positionState.top)
    const width = getPercentageRounded(canvasWidth, positionState.width)
    const height = getPercentageRounded(canvasHeight, positionState.height)
    answerZone.position.left.set(left)
    answerZone.position.top.set(top)
    answerZone.layout.width.set(width)
    answerZone.layout.height.set(height)
  }

  const minWidth = Math.max(canvasHeight * 0.2, 110)
  const minHeight = Math.max(canvasHeight * 0.09, 45)

  useEffect(() => {
    setPositionState((previous) => ({
      ...previous,
      width: positionState.width < minWidth ? minWidth : previous.width,
      height: positionState.width < minWidth ? minHeight : previous.height,
    }))
    if (positionState.width < minWidth) {
      answerZone.layout.width.set(minWidth / canvasWidth)
    }
    if (positionState.height < minHeight) {
      answerZone.layout.height.set(minHeight / canvasHeight)
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
      style={positionState}
      data-qa={`answer-zone-${answerZone.id.get()}`}
    >
      <ResizableBox
        className="h-full w-full"
        width={positionState.width}
        height={positionState.height}
        minConstraints={[minWidth, minHeight]}
        maxConstraints={[canvasWidth, canvasHeight]}
        onResize={handleResize}
        onResizeStop={handleResizeStop}
        resizeHandles={['ne', 'se', 'sw', 'nw']}
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
