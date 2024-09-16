import { useEffect, useMemo, useState } from 'react'
import type { ResizableProps } from 'react-resizable'

import type { AnswerZoneState } from '../types'
import { getPercentageRounded } from '../utils/percentage'

export const answerZoneDragType = 'answerZone'

interface PositionState {
  left: number
  top: number
  width: number
  height: number
}

export interface UseAnswerZoneResizeArgs {
  answerZone: AnswerZoneState
  canvasSize: [number, number]
}

const resizeHandles: ResizableProps['resizeHandles'] = ['ne', 'se', 'sw', 'nw']

export const useAnswerZoneResize = (args: UseAnswerZoneResizeArgs) => {
  const { answerZone, canvasSize } = args
  const [canvasWidth, canvasHeight] = canvasSize
  const left = answerZone.position.left.value
  const top = answerZone.position.top.value
  const height = answerZone.layout.height.value
  const width = answerZone.layout.width.value

  // Calculate the initial absolute position based on percentage values from plugin state
  const [positionState, setPositionState] = useState<PositionState>({
    left: canvasWidth * left,
    top: canvasHeight * top,
    width: canvasWidth * width,
    height: canvasHeight * height,
  })

  // Set minimum width and height for the answer zone based on arbitrary values.
  // If the size derived from the default minimum percentage is too small,
  // fall back to an absolute minimum size.
  const minWidth = Math.max(canvasHeight * 0.2, 110)
  const minHeight = Math.max(canvasHeight * 0.09, 45)

  const minSize: ResizableProps['minConstraints'] = useMemo(
    () => [minWidth, minHeight],
    [minHeight, minWidth]
  )

  // On mount, ensure that the answer zone is at least as large as the minimum size.
  useEffect(() => {
    setPositionState((previous) => ({
      ...previous,
      width: positionState.width < minWidth ? minWidth : previous.width,
      height: positionState.height < minHeight ? minHeight : previous.height,
    }))
    if (positionState.width < minWidth) {
      answerZone.layout.width.set(minWidth / canvasWidth)
    }
    if (positionState.height < minHeight) {
      answerZone.layout.height.set(minHeight / canvasHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Whenever percentage values from plugin state change, update the absolute position state
  useEffect(() => {
    setPositionState({
      left: canvasWidth * left,
      top: canvasHeight * top,
      width: canvasWidth * width,
      height: canvasHeight * height,
    })
  }, [canvasHeight, canvasWidth, height, left, top, width])

  // Handle resizing for all four corners
  const handleResize: ResizableProps['onResize'] = (_, { size, handle }) => {
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

  // Update the percentage values in plugin state on resize stop.
  // But, if the edges of the answer zone overflow the edges of the canvas,
  // snap the edges of the answer zone to the edges of the canvas.
  const handleResizeStop: ResizableProps['onResizeStop'] = (
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

  return {
    positionState,
    resizableBoxProps: {
      className: 'h-full w-full',
      width: positionState.width,
      height: positionState.height,
      minConstraints: minSize,
      maxConstraints: canvasSize,
      resizeHandles,
      onResize: handleResize,
      onResizeStop: handleResizeStop,
    },
  }
}
