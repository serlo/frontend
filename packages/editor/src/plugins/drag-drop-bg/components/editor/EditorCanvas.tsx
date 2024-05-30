/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { selectStaticDocument, store } from '@editor/store'
import { useContext, useState } from 'react'
import { XYCoord, useDrop } from 'react-dnd'

import type { DragDropBgProps } from '../..'
import { AnswerZonesContext } from '../../context/context'
import { answerZoneType, wrongAnswerType } from '../../types'
import { AnswerZone } from '../AnswerZone/AnswerZone'
import { AnswerZoneSettingsForm } from '../AnswerZone/AnswerZoneSettingsForm'
import { NewAnswerZoneFlow } from '../AnswerZone/NewAnswerZoneFlow'
import { PossibleAnswers } from '../shared/PossibleAnswers'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

/**
 * EditorCanvas component
 *
 * This component represents the canvas area where answer zones and possible answers are managed and displayed.
 * It supports adding, editing, and deleting answer zones as well as managing possible answers.
 *
 * @param {DragDropBgProps} props - The properties for the EditorCanvas component.
 */
export function EditorCanvas(props: DragDropBgProps) {
  const { state } = props
  const { answerZones, backgroundImage, extraDraggableAnswers } = state

  const context = useContext(AnswerZonesContext)

  const {
    zones,
    selectAnswerZone,
    moveAnswerZone,
    currentAnswerZone,
    canvasWidth,
    canvasHeight,
  } = context || {}

  const [, drop] = useDrop(
    () => ({
      accept: 'all',
      drop(answerZone: answerZoneType, monitor) {
        const change = monitor.getDifferenceFromInitialOffset()
        const delta = change || ({ x: 0, y: 0 } as XYCoord)
        const left = Math.round(answerZone.position.left.get() + delta.x)
        const top = Math.round(answerZone.position.top.get() + delta.y)
        moveAnswerZone(answerZone, left, top)
      },
    }),
    [answerZones]
  )

  const bgImgId = backgroundImage.get()
  const backgroundImageDocument = selectStaticDocument(
    store.getState(),
    bgImgId
  )
  const backgroundImageUrl = backgroundImageDocument?.state?.src || ''

  /**
   * Get the image source URL for an answer zone.
   * @param {string} answerZoneImageId - The ID of the answer zone image.
   * @returns {string} The image source URL.
   */
  const getAnswerZoneImageSrc = (answerZoneImageId: string) => {
    const answerImageDocument = selectStaticDocument(
      store.getState(),
      answerZoneImageId
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return answerImageDocument?.state?.src || ''
  }

  /**
   * Get the text content for an answer zone.
   * @param {string} answerZoneTextId - The ID of the answer zone text.
   * @returns {string} The text content.
   */
  const getAnswerZoneText = (answerZoneTextId: string) => {
    const answerTextDocument = selectStaticDocument(
      store.getState(),
      answerZoneTextId
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return answerTextDocument?.state[0]?.children[0].text || ''
  }

  /**
   * Convert an answer zone to possible answer format.
   * @param {answerZoneType | wrongAnswerType} zone - The answer zone or wrong answer zone.
   * @returns {Array} The possible answers.
   */
  const zoneToPossibleAnswer = (zone: answerZoneType | wrongAnswerType) => {
    const answers = zone.answers.map((answer) => {
      const zoneImageId = answer.image.get()
      const zoneImgUrl = getAnswerZoneImageSrc(zoneImageId)
      const zoneTextId = answer.text.get()
      const zoneText = getAnswerZoneText(zoneTextId)
      return { id: zoneImageId, imageUrl: zoneImgUrl, text: zoneText }
    })
    return answers
  }

  const correctAnswers = answerZones.map(zoneToPossibleAnswer).flat()
  const wrongAnswers = extraDraggableAnswers.map(zoneToPossibleAnswer).flat()
  const possibleAnswers = [...correctAnswers, ...wrongAnswers] // TODO: shuffle answers

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showCreateDropZoneModal, setShowCreateDropZoneModal] = useState(false)
  const [showCreateWrongAnswerModal, setShowCreateWrongAnswerModal] =
    useState(false)

  /**
   * Handle the click event for the settings button.
   * @param {string} id - The ID of the answer zone.
   */
  const onClickSettingsButton = (id: string) => {
    selectAnswerZone(id)
    setShowSettingsModal(true)
  }

  return (
    <>
      <ModalWithCloseButton
        isOpen={
          showSettingsModal ||
          showCreateDropZoneModal ||
          showCreateWrongAnswerModal
        }
        onCloseClick={() => {
          setShowSettingsModal(false)
          setShowCreateDropZoneModal(false)
          setShowCreateWrongAnswerModal(false)
        }}
        className="top-8 max-w-xl translate-y-0 sm:top-1/3"
      >
        <h3 className="serlo-h3 mt-4">
          {showSettingsModal ? 'Settings' : 'Neues Ablageobjekt'}
        </h3>
        {showSettingsModal && (
          <AnswerZoneSettingsForm
            answerZone={currentAnswerZone}
            onDuplicate={() => {}}
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
      </ModalWithCloseButton>
      <div
        ref={drop}
        className={`border-grey relative h-[${canvasHeight}] w-[${canvasWidth}] overflow-hidden border bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        {zones?.map((answerZone, index) => {
          return (
            <AnswerZone
              key={index}
              onClickSettingsButton={onClickSettingsButton}
              onClickPlusButton={() => {
                selectAnswerZone(answerZone.id.get())
                setShowCreateDropZoneModal(true)
              }}
              getAnswerZoneImageSrc={getAnswerZoneImageSrc}
              getAnswerZoneText={getAnswerZoneText}
              answerZone={answerZone}
            />
          )
        })}
      </div>
      <div className="mt-4">
        <PossibleAnswers canEdit possibleAnswers={possibleAnswers} />
      </div>
    </>
  )
}
