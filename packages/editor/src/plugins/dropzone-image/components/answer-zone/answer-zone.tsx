import { useContext } from 'react'
import { useDrag } from 'react-dnd'
import { ResizableBox } from 'react-resizable'

// eslint-disable-next-line import/no-unassigned-import
import 'react-resizable/css/styles.css'

import { AnswerZoneAnswer } from './answer-zone-answer'
import { AnswerZoneEmpty } from './answer-zone-empty'
import { AnswerZoneSidebar } from './answer-zone-sidebar'
import { AnswerZonesContext } from '../../context/context'
import { useAnswerZoneResize } from '../../hooks/use-answer-zone-resize'
import {
  type AnswerType,
  type AnswerZoneState,
  DropzoneVisibility,
} from '../../types'
import { cn } from '@/helper/cn'

export const answerZoneDragType = 'answerZone'

export interface AnswerZoneProps {
  answerZone: AnswerZoneState
  canvasSize: [number, number]
  onClick: () => void
  onClickSettingsButton: () => void
  onClickPlusButton: () => void
  onClickEditAnswerButton: (answerIndex: number, answerType: AnswerType) => void
}

export const AnswerZone = (props: AnswerZoneProps) => {
  const {
    answerZone,
    canvasSize,
    onClick,
    onClickSettingsButton,
    onClickPlusButton,
    onClickEditAnswerButton,
  } = props
  const name = answerZone.name.get()

  const context = useContext(AnswerZonesContext)
  const { dropzoneVisibility } = context || {}

  const { positionState, resizableBoxProps } = useAnswerZoneResize({
    answerZone,
    canvasSize,
  })

  const [collected, drag, dragPreview] = useDrag({
    type: answerZoneDragType,
    item: answerZone,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      hideSourceOnDrag: true,
    }),
  })

  // Hide source element while dragging
  if (collected.isDragging) {
    return <div ref={dragPreview} />
  }

  return (
    <div
      ref={dragPreview}
      className="absolute flex cursor-move items-center justify-center rounded bg-transparent"
      style={positionState}
      onClick={onClick}
      data-qa={`answer-zone-${answerZone.id.get()}`}
    >
      <div className="relative z-20">
        <ResizableBox {...resizableBoxProps}>
          <div
            ref={drag}
            className={cn(
              `group relative flex h-full w-full flex-wrap items-center
            justify-center gap-1 border-2 border-blue-500 bg-white`,
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
    </div>
  )
}
