/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { selectStaticDocument, store } from '@editor/store'
import { useContext, useState } from 'react'

import type { DragDropBgProps } from '../..'
import { AnswerZonesContext } from '../../context/context'
import { useAnswerZones } from '../../hooks/useAnswerZones'
import { answerZoneType, wrongAnswerType } from '../../types'
import { AnswerZone } from '../AnswerZone/AnswerZone'
import { AnswerZoneSettingsForm } from '../AnswerZone/AnswerZoneSettingsForm'
import { NewAnswerZoneFlow } from '../AnswerZone/NewAnswerZoneFlow'
import { PossibleAnswers } from '../shared/PossibleAnswers'
import { WrongAnswerFlow } from '../shared/WrongAnswerFlow'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export function EditorCanvas(props: DragDropBgProps) {
  const { state } = props
  const { answerZones, backgroundImage, extraDraggableAnswers } = state

  const context = useContext(AnswerZonesContext)

  const { zones } = context || {}
  const {
    currentAnswerZone,
    selectAnswerZone,
    drop,
    createWrongAnswer,
    selectWrongAnswer,
    currentWrongAnswer,
    onChangeDimensions,
  } = useAnswerZones(props)

  const bgImgId = backgroundImage.get()
  const backgroundImageDocument = selectStaticDocument(
    store.getState(),
    bgImgId
  )
  const backgroundImageUrl = backgroundImageDocument?.state?.src || ''

  const getAnswerZoneImageSrc = (answerZoneImageId: string) => {
    const answerImageDocument = selectStaticDocument(
      store.getState(),
      answerZoneImageId
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return answerImageDocument?.state?.src || ''
  }

  const getAnswerZoneText = (answerZoneTextId: string) => {
    const answerTextDocument = selectStaticDocument(
      store.getState(),
      answerZoneTextId
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return answerTextDocument?.state[0]?.children[0].text || ''
  }

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

  const onClickSettingsButton = (id: string) => {
    selectAnswerZone(id)
    setShowSettingsModal(true)
  }

  const onClickAddWrongAnswer = () => createWrongAnswer()

  const onClickWrongAnswerPlus = (id: string) => {
    selectWrongAnswer(id)
    setShowCreateWrongAnswerModal(true)
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
        {showCreateWrongAnswerModal && (
          <WrongAnswerFlow newWrongAnswer={currentWrongAnswer} />
        )}
      </ModalWithCloseButton>
      <div
        ref={drop}
        className="border-grey relative h-[786px] w-[786px] overflow-hidden border bg-center bg-no-repeat"
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
              onChangeDimensions={onChangeDimensions}
            />
          )
        })}
      </div>
      <div className="mt-4">
        <button
          className="rounded bg-blue-500 p-2 text-white"
          onClick={onClickAddWrongAnswer}
        >
          + Add wrong answer
        </button>
        <PossibleAnswers
          onClickEdit={onClickWrongAnswerPlus}
          canEdit
          possibleAnswers={possibleAnswers}
        />
      </div>
    </>
  )
}
