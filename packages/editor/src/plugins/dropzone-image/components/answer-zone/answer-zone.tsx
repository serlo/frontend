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
    setPositionState((previous) => ({
      ...size,
      left:
        handle === 'nw' || handle === 'sw'
          ? previous.left + previous.width - size.width
          : previous.left,
      top:
        handle === 'nw' || handle === 'ne'
          ? previous.top + previous.height - size.height
          : previous.top,
    }))
  }

  const handleResizeStop: ResizableBoxProps['onResizeStop'] = (
    _,
    { size, handle }
  ) => {
    if (handle === 'nw' || handle === 'sw') {
      const leftOnResizeStop =
        positionState.left + positionState.width - size.width
      const isOverflowingLeft = leftOnResizeStop < 0
      const newLeft = isOverflowingLeft ? 0 : leftOnResizeStop
      const newWidth = isOverflowingLeft
        ? positionState.width + leftOnResizeStop
        : size.width
      answerZone.position.left.set(getPercentageRounded(canvasWidth, newLeft))
      answerZone.layout.width.set(getPercentageRounded(canvasWidth, newWidth))
    } else {
      const rightOnResizeStop = positionState.left + size.width
      const isOverflowingRight = rightOnResizeStop > canvasWidth
      const newWidth = isOverflowingRight
        ? positionState.width + (canvasWidth - rightOnResizeStop)
        : size.width
      answerZone.layout.width.set(getPercentageRounded(canvasWidth, newWidth))
    }

    if (handle === 'nw' || handle === 'ne') {
      const topOnResizeStop =
        positionState.top + positionState.height - size.height
      const isOverflowingTop = topOnResizeStop < 0
      const newTop = isOverflowingTop ? 0 : topOnResizeStop
      const newHeight = isOverflowingTop
        ? positionState.height + topOnResizeStop
        : size.height
      answerZone.position.top.set(getPercentageRounded(canvasHeight, newTop))
      answerZone.layout.height.set(
        getPercentageRounded(canvasHeight, newHeight)
      )
    } else {
      const bottomOnResizeStop = positionState.top + size.height
      const isOverflowingBottom = bottomOnResizeStop > canvasHeight
      const newHeight = isOverflowingBottom
        ? positionState.height + (canvasHeight - bottomOnResizeStop)
        : size.height
      answerZone.layout.height.set(
        getPercentageRounded(canvasHeight, newHeight)
      )
    }
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
