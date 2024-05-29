import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

// TODO: Correctly import styles
// eslint-disable-next-line import/no-unassigned-import
import 'react-resizable/css/styles.css'

import { AnswerContent } from './AnswerContent'
import type { answerZoneType } from '../../types'
import { FaIcon } from '@/components/fa-icon'

/**
 * AnswerZone component props
 */
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

/**
 * AnswerZone component
 *
 * This component represents a draggable and resizable answer zone
 * which can display images or text answers. It also has buttons
 * for settings and adding new answers.
 */
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

  const [collected, drag, dragPreview] = useDrag({
    type: 'all',
    item: answerZone,
    canDrag: isDraggingEnabled && !isResizing,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      hideSourceOnDrag: true,
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

  /**
   * Renders the settings and plus buttons
   */
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

  /**
   * Renders the answers to be displayed inside the AnswerZone
   */

  const left = answerZone.position.left.get()
  const top = answerZone.position.top.get()
  const name = answerZone.name.get()

  const answers = answerZone.answers.map((answer, index) => {
    const answerImageUrl = getAnswerZoneImageSrc(answer.image.get())
    const answerText = getAnswerZoneText(answer.text.get())

    const hasImage = !!answerImageUrl
    const hasText = !!answerText

    if (index === 0 && !hasImage && !hasText) {
      return renderButtons()
    }

    return (
      <AnswerContent
        key={index}
        url={answerImageUrl}
        text={answerText}
        isPreview={false}
      />
    )
  })

  /**
   * Hide source element while dragging
   */
  if (collected.isDragging) {
    return <div ref={dragPreview} />
  }

  /**
   * Renders the answers to be displayed inside the AnswerZone
   */
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
          className="group relative flex h-full w-full flex-row border-2 border-blue-500"
        >
          {name && name.length > 0 && (
            <div className="absolute left-0 top-0 bg-white p-1 text-xs">
              {name}
            </div>
          )}
          {answerZone.answers.length === 0 && renderButtons()}
          {answers}
          {answerZone.answers.length > 0 && (
            <>
              <button
                className="absolute right-2 top-1 z-20 rounded bg-orange-100 p-1"
                style={{ fontSize: '.5rem' }}
                onClick={() =>
                  onClickPlusButton && onClickPlusButton(answerZone.id.get())
                }
              >
                <FaIcon icon={faPlus} />
              </button>
              <button
                className="absolute bottom-1 right-2 z-20 hidden rounded bg-orange-100 p-1 group-hover:block"
                style={{ fontSize: '.5rem' }}
                onClick={() =>
                  onClickSettingsButton &&
                  onClickSettingsButton(answerZone.id.get())
                }
              >
                <FaIcon icon={faCog} />
              </button>
            </>
          )}
        </div>
      </ResizableBox>
    </div>
  )
}
