import { DraggableArea } from '@editor/editor-ui/exercises/draggable-area'
import { RemovableInputWrapper } from '@editor/editor-ui/removable-input-wrapper'
import { selectStaticDocument, store } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { useContext, useEffect, useState } from 'react'
import { XYCoord, useDrop } from 'react-dnd'
import { useHotkeys } from 'react-hotkeys-hook'

import { EditorCanvasModal } from './editor-canvas-modal'
import type { DropzoneImageProps } from '../..'
import { AnswerZonesContext } from '../../context/context'
import { useAnswerZones } from '../../hooks/use-answer-zones'
import { AnswerZoneState, ModalType, answerDataType } from '../../types'
import {
  getAnswerZoneImageSrc,
  getAnswerZoneText,
} from '../../utils/answer-zone'
import { AnswerZone, answerZoneDragType } from '../answer-zone/answer-zone'
import { DraggableAnswer } from '../shared/draggable-answer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

/**
 *
 * This component represents the canvas area where answer zones and possible answers are managed and displayed.
 * It supports adding, editing, and deleting answer zones as well as managing possible answers.
 *
 */

export function EditorCanvas(props: DropzoneImageProps) {
  const { state } = props
  const {
    answerZones,
    backgroundImage,
    extraDraggableAnswers,
    canvasDimensions,
  } = state

  const [modalType, setModalType] = useState<ModalType>(ModalType.Unset)
  const { duplicateAnswerZone } = useAnswerZones(props)

  const context = useContext(AnswerZonesContext)
  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  const { zones, selectAnswerZone, selectCurrentAnswer, currentAnswerZone } =
    context || {}

  const [answerZoneClipboardItem, setAnswerZoneClipboardItem] =
    useState<AnswerZoneState | null>(null)

  const backgroundImageDocument = backgroundImage.defined
    ? (selectStaticDocument(
        store.getState(),
        backgroundImage.get()
      ) as EditorImageDocument)
    : null
  const backgroundImageUrl = (backgroundImageDocument?.state?.src ||
    '') as string

  const [didAdjustCanvasDimensions, setDidAdjustCanvasDimensions] =
    useState(false)

  // adjust canvas size to fit the background image
  useEffect(() => {
    if (!backgroundImageDocument || didAdjustCanvasDimensions) return
    const img = new Image()
    img.src = backgroundImageUrl
    img.onload = () => {
      const imgAspectRatio = img.width / img.height
      const maxCanvasWidth = canvasDimensions.width.get()
      const maxCanvasHeight = canvasDimensions.height.get()
      let newCanvasWidth = maxCanvasWidth
      let newCanvasHeight = maxCanvasHeight

      if (maxCanvasWidth / maxCanvasHeight > imgAspectRatio) {
        newCanvasHeight = maxCanvasWidth / imgAspectRatio
        if (newCanvasHeight > maxCanvasHeight) {
          newCanvasHeight = maxCanvasHeight
          newCanvasWidth = newCanvasHeight * imgAspectRatio
        }
      } else {
        newCanvasWidth = maxCanvasHeight * imgAspectRatio
        if (newCanvasWidth > maxCanvasWidth) {
          newCanvasWidth = maxCanvasWidth
          newCanvasHeight = newCanvasWidth / imgAspectRatio
        }
      }
      canvasDimensions.width.set(newCanvasWidth)
      canvasDimensions.height.set(newCanvasHeight)
      setDidAdjustCanvasDimensions(true)
    }
  })

  const [, drop] = useDrop(
    () => ({
      accept: answerZoneDragType,
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
        className="overflow-hidden rounded-lg border border-almost-black bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          height: `${canvasDimensions.height.get()}px`,
          width: `${canvasDimensions.width.get()}px`,
          backgroundSize: 'cover',
        }}
      >
        {zones?.map((answerZone, index) => {
          return (
            <AnswerZone
              key={index}
              answerZone={answerZone}
              maxHeight={canvasDimensions.height.get()}
              maxWidth={canvasDimensions.width.get()}
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
            />
          )
        })}
      </div>

      <div className="mt-4">
        <DraggableArea accept="none">
          {correctAnswers.map((possibleAnswer, index) => (
            <DraggableAnswer
              data-qa="plugin-drag-drop-correct-possible-answer"
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
                data-qa="plugin-dropzone-image-alternative-answer"
                draggableId={possibleAnswer.id}
                imageUrl={possibleAnswer.imageUrl}
                text={possibleAnswer.text}
              />
            </RemovableInputWrapper>
          ))}
        </DraggableArea>
        <div className="flex justify-center">
          <button
            data-qa="plugin-dropzone-image-add-wrong-answer-button"
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
