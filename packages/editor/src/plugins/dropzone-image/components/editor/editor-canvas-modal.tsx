import { EditorModal } from '@editor/editor-ui/editor-modal'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'

import type { DropzoneImageProps } from '../..'
import { type AnswerType, type AnswerZoneState, ModalType } from '../../types'
import { duplicateAnswerZone } from '../../utils/answer-zone'
import { AnswerRenderer } from '../answer-zone/answer-renderer'
import { AnswerZoneSettingsForm } from '../answer-zone/answer-zone-settings-form'
import { NewAnswerFlow } from '../answer-zone/new-answer-flow'

interface EditorCanvasModalProps {
  state: DropzoneImageProps['state']
  modalType: ModalType
  currentAnswer: {
    zone: AnswerZoneState
    index: number
    type: AnswerType
  }
  setModalType: (modalType: ModalType) => void
}

export function EditorCanvasModal({
  state,
  modalType,
  setModalType,
  currentAnswer,
}: EditorCanvasModalProps) {
  const pluginStrings = useEditStrings().plugins.dropzoneImage
  const { answerZones, extraDraggableAnswers } = state

  const title = modalType ? pluginStrings.modal[modalType] : ''

  return (
    <EditorModal
      isOpen={modalType !== ModalType.Unset}
      setIsOpen={(open) => {
        const isModalClosing = !open
        if (isModalClosing) setModalType(ModalType.Unset)
      }}
      className="top-[10%] max-h-[80%] translate-y-0 overflow-auto pb-40"
      title={title}
      extraTitleClassName="serlo-h3 mb-16 px-3"
    >
      {renderForm()}
    </EditorModal>
  )

  function renderForm() {
    if (modalType === ModalType.Unset) return null

    if (modalType === ModalType.Settings) {
      return (
        <AnswerZoneSettingsForm
          answerZone={currentAnswer.zone}
          onDuplicate={() => {
            duplicateAnswerZone(answerZones, currentAnswer.zone.id.value)
          }}
          onDelete={() => {
            setModalType(ModalType.Unset)
            const index = answerZones.findIndex(
              (a) => a.id.value === currentAnswer.zone.id.value
            )
            answerZones.remove(index)
          }}
        />
      )
    }

    if (modalType === ModalType.CreateDropZone) {
      return (
        <NewAnswerFlow
          answerZones={answerZones}
          extraDraggableAnswers={extraDraggableAnswers}
          zoneId={currentAnswer.zone.id.value}
          onSave={() => setModalType(ModalType.Unset)}
        />
      )
    }

    if (modalType === ModalType.Edit) {
      return (
        <AnswerRenderer
          zoneId={currentAnswer.zone.id.value}
          answerType={currentAnswer.type}
          answerIndex={currentAnswer.index}
          onSave={() => setModalType(ModalType.Unset)}
          answerZones={answerZones}
          extraDraggableAnswers={extraDraggableAnswers}
        />
      )
    }

    if (modalType === ModalType.CreateWrongAnswer) {
      return (
        <NewAnswerFlow
          isWrongAnswer
          onSave={() => setModalType(ModalType.Unset)}
          answerZones={answerZones}
          extraDraggableAnswers={extraDraggableAnswers}
        />
      )
    }
  }
}
