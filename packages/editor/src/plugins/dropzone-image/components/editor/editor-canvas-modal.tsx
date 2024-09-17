import type { DropzoneImageProps } from '../..'
import { type AnswerType, type AnswerZoneState, ModalType } from '../../types'
import { duplicateAnswerZone } from '../../utils/answer-zone'
import { AnswerRenderer } from '../answer-zone/answer-renderer'
import { AnswerZoneSettingsForm } from '../answer-zone/answer-zone-settings-form'
import { NewAnswerFlow } from '../answer-zone/new-answer-flow'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

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
  const pluginStrings = useEditorStrings().plugins.dropzoneImage
  const { answerZones, extraDraggableAnswers } = state

  return (
    <ModalWithCloseButton
      isOpen={modalType !== ModalType.Unset}
      setIsOpen={(open) => {
        const isModalClosing = !open
        if (isModalClosing) setModalType(ModalType.Unset)
      }}
      className="top-[10%] max-h-[80%] translate-y-0 overflow-auto pb-40"
      title={getTitle()}
      extraTitleClassName="serlo-h3 mb-16 px-3"
    >
      {renderForm()}
    </ModalWithCloseButton>
  )

  function getTitle() {
    switch (modalType) {
      case ModalType.Settings:
        return pluginStrings.modal.settings
      case ModalType.CreateDropZone:
        return pluginStrings.modal.new
      case ModalType.Edit:
        return pluginStrings.modal.edit
      case ModalType.CreateWrongAnswer:
        return pluginStrings.modal.wrong
      default:
        return ''
    }
  }

  function renderForm() {
    switch (modalType) {
      case ModalType.Settings:
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
      case ModalType.CreateDropZone:
        return (
          <NewAnswerFlow
            answerZones={answerZones}
            extraDraggableAnswers={extraDraggableAnswers}
            zoneId={currentAnswer.zone.id.value}
            onSave={() => setModalType(ModalType.Unset)}
          />
        )
      case ModalType.Edit:
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
      case ModalType.CreateWrongAnswer:
        return (
          <NewAnswerFlow
            isWrongAnswer
            onSave={() => setModalType(ModalType.Unset)}
            answerZones={answerZones}
            extraDraggableAnswers={extraDraggableAnswers}
          />
        )
      default:
        return null
    }
  }
}
