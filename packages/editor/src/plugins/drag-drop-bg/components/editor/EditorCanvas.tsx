/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { selectStaticDocument, store } from '@editor/store'
import { useState } from 'react'

import type { DragDropBgProps } from '../..'
import { useAnswerZones } from '../../hooks/useAnswerZones'
import { defaultContainerStyles } from '../../styles'
import { answerZoneType, wrongAnswerType } from '../../types'
import { AnswerZone } from '../answer-zone/AnswerZone'
import { AnswerZoneSettingsForm } from '../answer-zone/AnswerZoneSettingsForm'
import { NewAnswerZoneFlow } from '../answer-zone/NewAnswerZoneFlow'
import { PossibleAnswers } from '../shared/PossibleAnswers'
import { WrongAnswerFlow } from '../shared/WrongAnswerFlow'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export function EditorCanvas(props: DragDropBgProps) {
  const { state } = props

  const { answerZones, backgroundImage, extraDraggableAnswers } = state

  const {
    currentAnswerZone,
    selectAnswerZone,
    onChangeAnswerZone,
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

  const zoneToPossibleAnswer = (zone: answerZoneType | wrongAnswerType) => {
    const zoneImageId = zone.answer.image.get()
    const zoneImageDoc = selectStaticDocument(store.getState(), zoneImageId)
    const zoneImgUrl = zoneImageDoc?.state?.src || ''

    return {
      id: zoneImageId,
      imageUrl: zoneImgUrl,
    }
  }
  const correctAnswers = answerZones.map(zoneToPossibleAnswer)

  const wrongAnswers = extraDraggableAnswers.map(zoneToPossibleAnswer)

  // TODO: shuffle answers
  const possibleAnswers = [...correctAnswers, ...wrongAnswers]

  const dynamicStyles = {
    ...defaultContainerStyles,
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  }

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showCreateDropZoneModal, setShowCreateDropZoneModal] = useState(false)

  const [showCreateWrongAnswerModal, setShowCreateWrongAnswerModal] =
    useState(false)

  const onClickSettingsButton = (id: string) => {
    selectAnswerZone(id)
    setShowSettingsModal(true)
  }

  const onClickPlusButton = (id: string) => {
    selectAnswerZone(id)
    setShowCreateDropZoneModal(true)
  }

  const onClickAddWrongAnswer = () => {
    createWrongAnswer()
  }

  const onClickWrongAnswerPlus = (id: string) => {
    console.log('clickedplus', id)
    selectWrongAnswer(id)
    setShowCreateWrongAnswerModal(true)
  }

  const getAnswerZoneImageSrc = (answerZoneImageId: string) => {
    const answerImageDocument = selectStaticDocument(
      store.getState(),
      answerZoneImageId
    )
    return answerImageDocument?.state?.src || ''
  }

  const getAnswerZoneText = (answerZoneTextId: string) => {
    const answerTextDocument = selectStaticDocument(
      store.getState(),
      answerZoneTextId
    )
    return answerTextDocument?.state[0]?.children[0].text || ''
  }

  //TODO: editor strings
  // TODO: "Vorschau" button and preview mode
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
            onChange={onChangeAnswerZone}
            onDuplicate={() => {}}
            onDelete={() => {}}
          />
        )}
        {showCreateDropZoneModal && (
          <NewAnswerZoneFlow newAnswerZone={currentAnswerZone} />
        )}
        {showCreateWrongAnswerModal && (
          <WrongAnswerFlow newWrongAnswer={currentWrongAnswer} />
        )}
      </ModalWithCloseButton>
      <div ref={drop} style={dynamicStyles}>
        {answerZones.map((answerZone, index) => (
          <AnswerZone
            key={index}
            onClickSettingsButton={onClickSettingsButton}
            onClickPlusButton={onClickPlusButton}
            getAnswerZoneImageSrc={getAnswerZoneImageSrc}
            getAnswerZoneText={getAnswerZoneText}
            answerZone={answerZone}
            onChangeDimensions={onChangeDimensions}
          />
        ))}
      </div>
      <div className="mt-4">
        <button onClick={() => onClickAddWrongAnswer()}>
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
