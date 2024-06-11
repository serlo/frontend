import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { useDrag } from 'react-dnd'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

// eslint-disable-next-line import/no-unassigned-import
import 'react-resizable/css/styles.css'

import { AnswerZoneAnswer } from './answer-zone-answer'
import { AnswerZonesContext } from '../../context/context'
import { AnswerType, AnswerZoneState, DropzoneVisibility } from '../../types'
import {
  getAnswerZoneImageSrc,
  getAnswerZoneText,
} from '../../utils/answer-zone'
import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

export const answerZoneDragType = 'answerZone'

export interface AnswerZoneProps {
  answerZone: AnswerZoneState
  maxHeight: number
  maxWidth: number
  onClick?: (id: string) => void
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
  const name = answerZone.name.get()

  // Hide source element while dragging
  if (collected.isDragging) {
    return <div ref={dragPreview} />
  }

  return (
    <div
      ref={dragPreview}
      className="absolute flex cursor-move items-center justify-center rounded bg-transparent"
      onClick={() => onClick && onClick(answerZone.id.get())}
      style={{
        left,
        top,
        width: answerZone.layout.width.get(),
        height: answerZone.layout.height.get(),
      }}
      data-qa={`answer-zone-${answerZone.id.get()}`}
    >
      <ResizableBox
        className="h-full w-full p-[6px]"
        width={answerZone.layout.width.get()}
        height={answerZone.layout.height.get()}
        minConstraints={[100, 50]}
        maxConstraints={[maxWidth, maxHeight]}
        onResize={handleResize}
        resizeHandles={['se']}
      >
        <div
          ref={drag}
          className={cn(
            'group relative flex h-full w-full flex-row flex-wrap items-center justify-center gap-1 border-2 border-blue-500 bg-white',
            (dropzoneVisibility === DropzoneVisibility.None ||
              dropzoneVisibility === DropzoneVisibility.Partial) &&
              'border-dashed'
          )}
        >
          {name && name.length > 0 && renderDescription()}
          {answerZone.answers.length === 0 && renderEmptyState()}
          {renderAnswers()}
          {answerZone.answers.length > 0 && renderButtonsSidebar()}
        </div>
      </ResizableBox>
    </div>
  )

  function renderDescription() {
    return (
      <div className="absolute left-0 top-0 bg-white p-1 text-xs">{name}</div>
    )
  }

  function renderEmptyState() {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="absolute right-2 top-2 z-10 rounded bg-orange-100 p-1"
          onClick={() => onClickSettingsButton(answerZone.id.get())}
        >
          <FaIcon icon={faCog} />
        </button>
        <button
          data-qa={`answer-zone-${answerZone.id.get()}-add-answer-button`}
          className="rounded bg-orange-100 p-3"
          onClick={() => onClickPlusButton(answerZone.id.get())}
        >
          <FaIcon icon={faPlus} />
        </button>
      </div>
    )
  }

  function renderButtonsSidebar() {
    return (
      <>
        <button
          data-qa={`answer-zone-${answerZone.id.get()}-add-another-answer-button`}
          className="absolute right-2 top-1 z-20 rounded bg-orange-100 p-1 text-[0.5rem]"
          onClick={() => onClickPlusButton(answerZone.id.get())}
        >
          <FaIcon icon={faPlus} />
        </button>
        <button
          data-qa={`answer-zone-${answerZone.id.get()}-settings-button`}
          className="absolute bottom-1 right-2 z-20 hidden rounded bg-orange-100 p-1  text-[0.5rem] group-hover:block"
          onClick={() => onClickSettingsButton(answerZone.id.get())}
        >
          <FaIcon icon={faCog} />
        </button>
      </>
    )
  }

  function renderAnswers() {
    return answerZone.answers.map((answer, index) => {
      const answerImageUrl = getAnswerZoneImageSrc(answer.image.get())
      const answerText = getAnswerZoneText(answer.text.get())
      const answerType = answerImageUrl ? AnswerType.Image : AnswerType.Text

      return (
        <AnswerZoneAnswer
          key={index}
          answerImageUrl={answerImageUrl}
          answerText={answerText}
          answerType={answerType}
          dataQa={`answer-zone-${answer.id.get()}-remove-answer-button`}
          onEditAnswer={() => {
            onClickEditAnswerButton(answerZone.id.get(), index, answerType)
          }}
          onRemoveAnswer={() => {
            answerZone.answers.remove(index)
          }}
        />
      )
    })
  }
}
