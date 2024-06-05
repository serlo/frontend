import { selectStaticDocument, store } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { useContext, useState } from 'react'
import { XYCoord, useDrop } from 'react-dnd'
import { useHotkeys } from 'react-hotkeys-hook'

import type { DragDropBgProps } from '../..'
import { AnswerZonesContext } from '../../context/context'
import { useAnswerZones } from '../../hooks/use-answer-zones'
import { AnswerZoneState } from '../../types'
import { AnswerZone } from '../answer-zone/answer-zone'
import { AnswerZoneSettingsForm } from '../answer-zone/answer-zone-settings-form'
import { EditAnswerZone } from '../answer-zone/edit-answer-zone'
import { NewAnswerZoneFlow } from '../answer-zone/new-answer-zone-flow'
import { PossibleAnswers } from '../shared/possible-answers'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

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

  const { getAnswerZoneImageSrc, getAnswerZoneText, duplicateAnswerZone } =
    useAnswerZones(props)

  const context = useContext(AnswerZonesContext)

  const {
    zones,
    selectAnswerZone,
    selectCurrentAnswer,
    currentAnswerZone,
    currentAnswerIndex,
    currentAnswerType,
    canvasShape,
  } = context || {}

  const [answerZoneClipboardItem, setAnswerZoneClipboardItem] =
    useState<AnswerZoneState | null>(null)

  const { canvasHeight, canvasWidth } = getCanvasDimensions(canvasShape)

  const onClickAddWrongAnswer = () => {
    setShowCreateWrongAnswerModal(true)
  }

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

  /**
   * Convert an answer zone to possible answer format.
   */
  const zoneToPossibleAnswer = (zone: AnswerZoneState) => {
    const answers = zone.answers.map((answer) => {
      const zoneImageId = answer.image.get()
      const zoneImgUrl = getAnswerZoneImageSrc(zoneImageId)
      const zoneTextId = answer.text.get()
      const zoneText = getAnswerZoneText(zoneTextId)
      return { id: zoneImageId, imageUrl: zoneImgUrl, text: zoneText }
    })
    return answers
  }

  const correctAnswers = zones.map(zoneToPossibleAnswer).flat()
  const wrongAnswers = extraDraggableAnswers.map(zoneToPossibleAnswer).flat()
  const possibleAnswers = [...correctAnswers, ...wrongAnswers]

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showCreateDropZoneModal, setShowCreateDropZoneModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showCreateWrongAnswerModal, setShowCreateWrongAnswerModal] =
    useState(false)

  return (
    <>
      <ModalWithCloseButton
        isOpen={
          showSettingsModal ||
          showCreateDropZoneModal ||
          showEditModal ||
          showCreateWrongAnswerModal
        }
        onCloseClick={() => {
          setShowSettingsModal(false)
          setShowCreateDropZoneModal(false)
          setShowEditModal(false)
          setShowCreateWrongAnswerModal(false)
        }}
        className=" max-w-md translate-y-0 sm:top-1/4"
      >
        <h3 className="serlo-h3 mt-4 px-3">
          {showSettingsModal ? 'Settings' : 'Neues Ablageobjekt'}
        </h3>
        {showSettingsModal && (
          <AnswerZoneSettingsForm
            answerZone={currentAnswerZone}
            onDuplicate={() => {
              duplicateAnswerZone(currentAnswerZone.id.get())
            }}
            onDelete={() => {
              setShowSettingsModal(false)
              const index = answerZones.findIndex(
                (a) => a.id.get() === currentAnswerZone.id.get()
              )
              answerZones.remove(index)
            }}
          />
        )}
        {showCreateDropZoneModal && (
          <NewAnswerZoneFlow zoneId={currentAnswerZone.id.get()} />
        )}
        {showEditModal && (
          <EditAnswerZone
            zoneId={currentAnswerZone.id.get()}
            answerType={currentAnswerType}
            answerIndex={currentAnswerIndex}
            onSave={() => setShowEditModal(false)}
          />
        )}
      </ModalWithCloseButton>
      <div
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
                setShowSettingsModal(true)
              }}
              onClickPlusButton={() => {
                selectAnswerZone(answerZone.id.get())
                setShowCreateDropZoneModal(true)
              }}
              onClickEditAnswerButton={(zoneId, answerIndex, answerType) => {
                selectAnswerZone(zoneId)
                selectCurrentAnswer(answerIndex, answerType)
                setShowEditModal(true)
              }}
              getAnswerZoneImageSrc={getAnswerZoneImageSrc}
              getAnswerZoneText={getAnswerZoneText}
              answerZone={answerZone}
            />
          )
        })}
      </div>
      <div className="mt-4">
        <PossibleAnswers
          canEdit
          possibleAnswers={possibleAnswers}
          onClickAddWrongAnswer={onClickAddWrongAnswer}
        />
      </div>
    </>
  )
}
