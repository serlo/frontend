import { DraggableArea } from '@editor/editor-ui/exercises/draggable-area'
import { RemovableInputWrapper } from '@editor/editor-ui/removable-input-wrapper'
import { selectStaticDocument, store } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { useContext, useState } from 'react'
import { XYCoord, useDrop } from 'react-dnd'
import { useHotkeys } from 'react-hotkeys-hook'

import { EditorCanvasModal } from './editor-canvas-modal'
import type { DragDropBgProps } from '../..'
import { AnswerZonesContext } from '../../context/context'
import { useAnswerZones } from '../../hooks/use-answer-zones'
import { AnswerZoneState, ModalType, answerDataType } from '../../types'
import { AnswerZone } from '../answer-zone/answer-zone'
import { DraggableAnswer } from '../shared/draggable-answer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

const getCanvasDimensions = (shape: string) => {
  switch (shape) {
    case 'square':
      return { canvasHeight: '786px', canvasWidth: '786px' }
    case 'landscape':
      return { canvasHeight: '786px', canvasWidth: '1024px' }
    case 'portrait':
      return { canvasHeight: '1024px', canvasWidth: '786px' }
    default:
      return { canvasHeight: '1px', canvasWidth: '1px' }
  }
}

/**
 *
 * This component represents the canvas area where answer zones and possible answers are managed and displayed.
 * It supports adding, editing, and deleting answer zones as well as managing possible answers.
 *
 */

export function EditorCanvas(props: DragDropBgProps) {
  const { state } = props
  const { answerZones, backgroundImage, extraDraggableAnswers } = state

  const [modalType, setModalType] = useState<ModalType>(ModalType.Unset)
  const { getAnswerZoneImageSrc, getAnswerZoneText, duplicateAnswerZone } =
    useAnswerZones(props)

  const context = useContext(AnswerZonesContext)
  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  const {
    zones,
    selectAnswerZone,
    selectCurrentAnswer,
    currentAnswerZone,
    canvasShape,
  } = context || {}

  const [answerZoneClipboardItem, setAnswerZoneClipboardItem] =
    useState<AnswerZoneState | null>(null)

  const { canvasHeight, canvasWidth } = getCanvasDimensions(canvasShape)

  const [, drop] = useDrop(
    () => ({
      accept: 'all',
      drop(answerZone: AnswerZoneState, monitor) {
        const change = monitor.getDifferenceFromInitialOffset()
        const delta = change || ({ x: 0, y: 0 } as XYCoord)
        const left = Math.round(answerZone.position.left.get() + delta.x)
        const top = Math.round(answerZone.position.top.get() + delta.y)
        answerZone.position.left.set(left)
        answerZone.position.top.set(top)
      },
    }),
    [zones]
  )

  useHotkeys('backspace, del', (event) => {
    if (!currentAnswerZone) return
    const index = answerZones.findIndex(
      (a) => a.id.get() === currentAnswerZone.id.get()
    )
    index !== -1 && answerZones.remove(index)
    event.preventDefault()
  })

  useHotkeys(['ctrl+c, meta+c'], (event) => {
    setAnswerZoneClipboardItem(currentAnswerZone)
    event.preventDefault()
  })

  useHotkeys(['ctrl+v, meta+v'], (event) => {
    if (!answerZoneClipboardItem) return
    const idToDuplicate = answerZoneClipboardItem.id.get()
    duplicateAnswerZone(idToDuplicate)
    event.preventDefault()
  })

  const backgroundImageDocument = backgroundImage.defined
    ? (selectStaticDocument(
        store.getState(),
        backgroundImage.get()
      ) as EditorImageDocument)
    : null
  const backgroundImageUrl = (backgroundImageDocument?.state?.src ||
    '') as string

  const convertAnswer = (answer: answerDataType) => {
    const zoneImageId = answer.image.get()
    const zoneImgUrl = getAnswerZoneImageSrc(zoneImageId)
    const zoneTextId = answer.text.get()
    const zoneText = getAnswerZoneText(zoneTextId)
    return { id: zoneImageId, imageUrl: zoneImgUrl, text: zoneText }
  }

  const correctAnswers = zones
    .map(({ answers }) => answers.map(convertAnswer))
    .flat()
  const wrongAnswers = extraDraggableAnswers.map(convertAnswer)

  return (
    <>
      <EditorCanvasModal
        answerZones={answerZones}
        modalType={modalType}
        duplicateAnswerZone={duplicateAnswerZone}
        setModalType={setModalType}
      />

      <div
        data-qa="plugin-drag-drop-editor-canvas"
        ref={drop}
        className="mx-auto overflow-hidden rounded-lg border border-almost-black bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          height: canvasHeight,
          width: canvasWidth,
        }}
      >
        {zones?.map((answerZone, index) => {
          return (
            <AnswerZone
              key={index}
              onClick={() => selectAnswerZone(answerZone.id.get())}
              onClickSettingsButton={() => {
                selectAnswerZone(answerZone.id.get())
                setModalType(ModalType.Settings)
              }}
              onClickPlusButton={() => {
                selectAnswerZone(answerZone.id.get())
                setModalType(ModalType.CreateDropZone)
              }}
              onClickEditAnswerButton={(zoneId, answerIndex, answerType) => {
                selectAnswerZone(zoneId)
                selectCurrentAnswer(answerIndex, answerType)
                setModalType(ModalType.Edit)
              }}
              getAnswerZoneImageSrc={getAnswerZoneImageSrc}
              getAnswerZoneText={getAnswerZoneText}
              answerZone={answerZone}
            />
          )
        })}
      </div>

      <div className="mt-4">
        <DraggableArea accept="none">
          {correctAnswers.map((possibleAnswer, index) => (
            <DraggableAnswer
              draggableId={possibleAnswer.id}
              key={index}
              imageUrl={possibleAnswer.imageUrl}
              text={possibleAnswer.text}
            />
          ))}
        </DraggableArea>
        <span className="mx-4">{blanksExerciseStrings.dummyAnswers}:</span>
        <DraggableArea accept="none">
          {wrongAnswers.map((possibleAnswer, index) => (
            <RemovableInputWrapper
              key={index}
              onRemoveClick={() => {
                extraDraggableAnswers.remove(index)
              }}
              tooltipText={blanksExerciseStrings.removeDummyAnswer}
            >
              <DraggableAnswer
                draggableId={possibleAnswer.id}
                imageUrl={possibleAnswer.imageUrl}
                text={possibleAnswer.text}
              />
            </RemovableInputWrapper>
          ))}
        </DraggableArea>
        <div className="flex justify-center">
          <button
            onClick={() => {
              setModalType(ModalType.CreateWrongAnswer)
            }}
            className="rounded bg-orange-100 px-4 py-2"
          >
            Add wrong answer
          </button>
        </div>
      </div>
    </>
  )
}
