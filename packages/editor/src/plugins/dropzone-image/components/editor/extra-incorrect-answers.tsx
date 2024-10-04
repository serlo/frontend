import { DraggableArea } from '@editor/editor-ui/exercises/draggable-area'
import { RemovableInputWrapper } from '@editor/editor-ui/removable-input-wrapper'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'

import type { DropzoneImageProps } from '../..'
import { ModalType } from '../../types'
import { convertAnswer } from '../../utils/answer-zone'
import { DraggableAnswer } from '../shared/draggable-answer'

interface ExtraIncorrectAnswersProps {
  extraDraggableAnswers: DropzoneImageProps['state']['extraDraggableAnswers']
  setModalType: (modalType: ModalType) => void
}

export function ExtraIncorrectAnswers(props: ExtraIncorrectAnswersProps) {
  const { extraDraggableAnswers, setModalType } = props

  const blanksExerciseStrings = useEditStrings().plugins.blanksExercise

  const answers = extraDraggableAnswers.map(convertAnswer)

  return (
    <>
      {answers.length > 0 && (
        <>
          <span>{blanksExerciseStrings.dummyAnswers}:</span>

          <DraggableArea accept="none">
            {answers.map((possibleAnswer, index) => (
              <RemovableInputWrapper
                key={index}
                onRemoveClick={() => {
                  extraDraggableAnswers.remove(index)
                }}
                tooltipText={blanksExerciseStrings.removeDummyAnswer}
              >
                <DraggableAnswer
                  answer={possibleAnswer}
                  data-qa="plugin-dropzone-image-alternative-answer"
                />
              </RemovableInputWrapper>
            ))}
          </DraggableArea>
        </>
      )}
      <button
        className="serlo-button-editor-secondary"
        onClick={() => setModalType(ModalType.CreateWrongAnswer)}
        data-qa="plugin-dropzone-image-add-wrong-answer-button"
      >
        {blanksExerciseStrings.addDummyAnswer}
      </button>
    </>
  )
}
