import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import {
  faCog,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { useDrag } from 'react-dnd'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'
import { Descendant } from 'slate'

// eslint-disable-next-line import/no-unassigned-import
import 'react-resizable/css/styles.css'

import { AnswerContent } from './answer-content'
import { AnswerZonesContext } from '../../context/context'
import { AnswerType, AnswerZoneState, DropzoneVisibility } from '../../types'
import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

export const answerZoneDragType = 'answerZone'

export interface AnswerZoneProps {
  answerZone: AnswerZoneState
  onClickSettingsButton: (id: string) => void
  onClick?: (id: string) => void
  onClickPlusButton: (id: string) => void
  onClickEditAnswerButton: (
    answerZoneId: string,
    answerIndex: number,
    answerType: AnswerType
  ) => void
  getAnswerZoneImageSrc: (id: string) => string
  getAnswerZoneText: (answerZoneId: string) => Descendant[] | undefined
}

/**
 * This component represents a draggable and resizable answer zone
 * which can display images or text answers. It also has buttons
 * for settings and adding new answers.
 */
export const AnswerZone = (props: AnswerZoneProps) => {
  const {
    answerZone,
    onClick,
    onClickSettingsButton,
    onClickPlusButton,
    onClickEditAnswerButton,
    getAnswerZoneImageSrc,
    getAnswerZoneText,
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

  // Renders the answer zone description
  const renderDescription = () => (
    <div className="absolute left-0 top-0 bg-white p-1 text-xs">{name}</div>
  )

  // Renders the settings and plus buttons when the answer zone has no answers
  const renderEmptyState = () => (
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

  // Renders the settings and plus buttons as a sidebar, when some answers are present
  const renderButtonsSidebar = () => (
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

  const left = answerZone.position.left.get()
  const top = answerZone.position.top.get()
  const name = answerZone.name.get()

  // Renders the answers to be displayed inside the AnswerZone
  const answers = answerZone.answers.map((answer, index) => {
    const answerImageUrl = getAnswerZoneImageSrc(answer.image.get())
    const answerText = getAnswerZoneText(answer.text.get())
    const answerType = answerImageUrl ? AnswerType.Image : AnswerType.Text

    return (
      <div
        key={index}
        className={cn(`
          group/edit relative
          ${answerType === AnswerType.Image ? 'h-full object-contain' : ''}
        `)}
      >
        <div
          className={cn(`
            absolute bottom-0 left-0 right-0 top-0 mx-1 hidden h-full
            items-center justify-center rounded-full group-hover/edit:flex
          `)}
        >
          <button
            onClick={() => {
              onClickEditAnswerButton(answerZone.id.get(), index, answerType)
            }}
            className="serlo-button-editor-secondary serlo-tooltip-trigger mx-1 h-6 w-6 p-0"
          >
            <FaIcon icon={faPencilAlt} className="text-xs" />
            <EditorTooltip text="Edit answer" className="!-ml-2 !pb-2" />
          </button>
          <button
            data-qa={`answer-zone-${answerZone.id.get()}-remove-answer-button`}
            onClick={() => {
              answerZone.answers.remove(index)
            }}
            className="serlo-button-editor-secondary serlo-tooltip-trigger mx-1 h-6 w-6 p-0"
          >
            <FaIcon icon={faTrashAlt} className="text-xs" />
            <EditorTooltip text="Remove answer" className="!-ml-2 !pb-2" />
          </button>
        </div>

        <AnswerContent
          url={answerImageUrl}
          text={answerText}
          isPreview={false}
          display="block"
        />
      </div>
    )
  })

  // Hide source element while dragging
  if (collected.isDragging) {
    return <div ref={dragPreview} />
  }

  // Renders the answers to be displayed inside the AnswerZone
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
        maxConstraints={[500, 300]}
        onResize={handleResize}
        resizeHandles={['nw', 'ne', 'sw', 'se']}
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
          {answers}
          {answerZone.answers.length > 0 && renderButtonsSidebar()}
        </div>
      </ResizableBox>
    </div>
  )
}
