import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'
import 'react-resizable/css/styles.css'

import type { answerZoneType } from '../../types'
import { AnswerImage } from '../shared/AnswerImage'
import { AnswerText } from '../shared/AnswerText'
import { FaIcon } from '@/components/fa-icon'

export interface AnswerZoneProps {
  answerZone: answerZoneType
  hideSourceOnDrag?: boolean
  isDraggingEnabled?: boolean
  onClickSettingsButton?: (id: string) => void
  onClickPlusButton?: (id: string) => void
  getAnswerZoneImageSrc: (id: string) => string
  getAnswerZoneText: (text: string) => string
  onChangeDimensions: (
    id: string,
    dimensions: { width: number; height: number }
  ) => void
}

export const AnswerZone = (props: AnswerZoneProps) => {
  const [isResizing, setIsResizing] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 200, height: 70 })

  const {
    answerZone,
    isDraggingEnabled,
    onClickSettingsButton,
    onClickPlusButton,
    getAnswerZoneImageSrc,
    onChangeDimensions,
    getAnswerZoneText,
  } = props

  const [, drag, dragPreview] = useDrag({
    type: 'all',
    item: answerZone,
    canDrag: isDraggingEnabled && !isResizing,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const handleResize: ResizableBoxProps['onResize'] = (_, { size }) => {
    setIsResizing(true)
    setDimensions(size)
    onChangeDimensions(answerZone.id.get(), size)
  }

  const handleResizeStop: ResizableBoxProps['onResizeStop'] = () => {
    setIsResizing(false)
  }

  const renderButtons = () => (
    <>
      <div className="absolute right-2 top-2">
        <button
          className="rounded bg-orange-100 p-1"
          onClick={() => onClickSettingsButton?.(answerZone.id.get())}
        >
          <FaIcon icon={faCog} />
        </button>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="rounded bg-orange-100 p-3"
          onClick={() => onClickPlusButton?.(answerZone.id.get())}
        >
          <FaIcon icon={faPlus} />
        </button>
      </div>
    </>
  )

  const left = answerZone.position.left.get()
  const top = answerZone.position.top.get()
  const answerImageUrl = getAnswerZoneImageSrc(answerZone.answer.image.get())
  const answerText = getAnswerZoneText(answerZone.answer.text.get())

  return (
    <div
      ref={dragPreview}
      className="absolute flex cursor-move items-center justify-center rounded bg-white"
      style={{
        left,
        top,
        width: dimensions.width,
        height: dimensions.height,
      }}
      data-qa={`answer-zone-${answerZone.id.get()}`}
    >
      <ResizableBox
        width={dimensions.width}
        height={dimensions.height}
        minConstraints={[100, 50]}
        maxConstraints={[500, 300]}
        onResize={handleResize}
        onResizeStop={handleResizeStop}
        resizeHandles={['nw', 'ne', 'sw', 'se']}
        style={{
          width: '100%',
          height: '100%',
          padding: '6px',
        }}
      >
        <div
          ref={drag}
          className="relative h-full w-full border-2 border-blue-500"
        >
          {answerImageUrl ? (
            <AnswerImage
              width={dimensions.width}
              height={dimensions.height}
              url={answerImageUrl}
            />
          ) : answerText ? (
            <AnswerText
              width={dimensions.width}
              height={dimensions.height}
              text={answerText}
            />
          ) : (
            renderButtons()
          )}
        </div>
      </ResizableBox>
    </div>
  )
}
