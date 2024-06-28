import { useContext } from 'react'

import type { DropzoneImageProps } from '../..'
import { AnswerZonesContext } from '../../context/context'
import { ModalType } from '../../types'
import { AnswerRenderer } from '../answer-zone/answer-renderer'
import { AnswerZoneSettingsForm } from '../answer-zone/answer-zone-settings-form'
import { NewAnswerFlow } from '../answer-zone/new-answer-flow'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface EditorCanvasModalProps {
  answerZones: DropzoneImageProps['state']['answerZones']
  modalType: ModalType
  duplicateAnswerZone: (idToDuplicate: string) => void
  setModalType: (modalType: ModalType) => void
}

export function EditorCanvasModal(props: EditorCanvasModalProps) {
  const { answerZones, modalType, duplicateAnswerZone, setModalType } = props

  const pluginStrings = useEditorStrings().plugins.dropzoneImage

  const context = useContext(AnswerZonesContext)
  if (!context) return null

  const { currentAnswerZone, currentAnswerIndex, currentAnswerType } = context

  return (
    <ModalWithCloseButton
      isOpen={modalType !== ModalType.Unset}
      setIsOpen={(open) => {
        const isModalClosing = !open
        if (isModalClosing) setModalType(ModalType.Unset)
      }}
      className="top-[10%] max-h-[80%] translate-y-0 overflow-auto pb-40"
    >
      <h3 className="serlo-h3 mb-16 px-3">{renderTitle()}</h3>
      {renderForm()}
    </ModalWithCloseButton>
  )

  function renderTitle() {
    switch (modalType) {
      case ModalType.Settings:
        return <>{pluginStrings.modal.settings}</>
      case ModalType.CreateDropZone:
        return <>{pluginStrings.modal.new}</>
      case ModalType.Edit:
        return <>{pluginStrings.modal.edit}</>
      case ModalType.CreateWrongAnswer:
        return <>{pluginStrings.modal.wrong}</>
      default:
        return null
    }
  }

  function renderForm() {
    switch (modalType) {
      case ModalType.Settings:
        return (
          <AnswerZoneSettingsForm
            answerZone={currentAnswerZone}
            onDuplicate={() => {
              duplicateAnswerZone(currentAnswerZone.id.get())
            }}
            onDelete={() => {
              setModalType(ModalType.Unset)
              const index = answerZones.findIndex(
                (a) => a.id.get() === currentAnswerZone.id.get()
              )
              answerZones.remove(index)
            }}
          />
        )
      case ModalType.CreateDropZone:
        return (
          <NewAnswerFlow
            zoneId={currentAnswerZone.id.get()}
            onSave={() => setModalType(ModalType.Unset)}
          />
        )
      case ModalType.Edit:
        return (
          <AnswerRenderer
            zoneId={currentAnswerZone.id.get()}
            answerType={currentAnswerType}
            answerIndex={currentAnswerIndex}
            onSave={() => setModalType(ModalType.Unset)}
          />
        )
      case ModalType.CreateWrongAnswer:
        return (
          <NewAnswerFlow
            isWrongAnswer
            onSave={() => setModalType(ModalType.Unset)}
          />
        )
      default:
        return null
    }
  }
}
