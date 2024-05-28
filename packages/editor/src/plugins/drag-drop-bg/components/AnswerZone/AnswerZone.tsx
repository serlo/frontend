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
    <div className="absolute inset-0 flex items-center justify-center">
      <button
        className="absolute right-2 top-2 z-10 rounded bg-orange-100 p-1"
        onClick={() => onClickSettingsButton?.(answerZone.id.get())}
      >
        <FaIcon icon={faCog} />
      </button>
      <button
        className="rounded bg-orange-100 p-3"
        onClick={() => onClickPlusButton?.(answerZone.id.get())}
      >
        <FaIcon icon={faPlus} />
      </button>
    </div>
  )

  const left = answerZone.position.left.get()
  const top = answerZone.position.top.get()

  const answers = answerZone.answers.map((answer, index) => {
    const answerImageUrl = getAnswerZoneImageSrc(answer.image.get())
    const answerText = getAnswerZoneText(answer.text.get())

    const hasImage = !!answerImageUrl
    const hasText = !!answerText

    if (index === 0 && !hasImage && !hasText) {
      return renderButtons()
    }
    return answerImageUrl ? (
      <AnswerImage
        key={index}
        width={dimensions.width}
        height={dimensions.height}
        url={answerImageUrl}
      />
    ) : answerText ? (
      <AnswerText
        key={index}
        width={dimensions.width}
        height={dimensions.height}
        text={answerText}
      />
    ) : null
  })
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
          className="relative flex h-full w-full flex-row border-2 border-blue-500"
        >
          {answerZone.answers.length === 0 && renderButtons()}
          {answers}
          {answerZone.answers.length > 0 && (
            <button
              className="absolute right-2 top-2 z-20 rounded bg-orange-100 p-1"
              style={{ fontSize: '.5rem' }}
              onClick={() =>
                onClickPlusButton && onClickPlusButton(answerZone.id.get())
              }
            >
              <FaIcon icon={faPlus} />
            </button>
          )}
        </div>
      </ResizableBox>
    </div>
  )
}
