import { useContext } from 'react'
import { useDrag } from 'react-dnd'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

// eslint-disable-next-line import/no-unassigned-import
import 'react-resizable/css/styles.css'

import { AnswerZoneAnswer } from './answer-zone-answer'
import { AnswerZoneEmpty } from './answer-zone-empty'
import { AnswerZoneSidebar } from './answer-zone-sidebar'
import { AnswerZonesContext } from '../../context/context'
import { AnswerType, AnswerZoneState, DropzoneVisibility } from '../../types'
import { cn } from '@/helper/cn'

export const answerZoneDragType = 'answerZone'

export interface AnswerZoneProps {
  answerZone: AnswerZoneState
  maxHeight: number
  maxWidth: number
  onClick: () => void
  onClickSettingsButton: (id: string) => void
  onClickPlusButton: (id: string) => void
  onClickEditAnswerButton: (
    answerZoneId: string,
    answerIndex: number,
    answerType: AnswerType
  ) => void
}

export const AnswerZone = (props: AnswerZoneProps) => {
  const {
    answerZone,
    maxHeight,
    maxWidth,
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
    answerZone.layout.width.set(size.width)
    answerZone.layout.height.set(size.height)
  }

  const left = answerZone.position.left.get()
  const top = answerZone.position.top.get()
  const height = answerZone.layout.height.get()
  const width = answerZone.layout.width.get()
  const name = answerZone.name.get()

  // Hide source element while dragging
  if (collected.isDragging) {
    return <div ref={dragPreview} />
  }

  return (
    <div
      ref={dragPreview}
      className="absolute flex cursor-move items-center justify-center rounded bg-transparent"
      onClick={onClick}
      style={{ left, top, width, height }}
      data-qa={`answer-zone-${answerZone.id.get()}`}
    >
      <ResizableBox
        className="h-full w-full p-[6px]"
        width={width}
        height={height}
        minConstraints={[100, 50]}
        maxConstraints={[maxWidth, maxHeight]}
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
                onClickEditAnswerButton(answerZone.id.get(), index, answerType)
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
