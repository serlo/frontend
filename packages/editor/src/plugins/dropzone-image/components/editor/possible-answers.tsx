import { DraggableArea } from '@editor/editor-ui/exercises/draggable-area'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'

import type { DropzoneImageProps } from '../..'
import { convertAnswer, insertAnswerZone } from '../../utils/answer-zone'
import { DraggableAnswer } from '../shared/draggable-answer'

interface PossibleAnswersProps {
  answerZones: DropzoneImageProps['state']['answerZones']
}

export function PossibleAnswers({ answerZones }: PossibleAnswersProps) {
  const dropzoneImageStrings = useEditStrings().plugins.dropzoneImage

  const correctAnswers = answerZones
    .map(({ answers }) => answers.map(convertAnswer))
    .flat()

  return (
    <div className="mt-4">
      <button
        className="serlo-button-editor-primary"
        onClick={() => insertAnswerZone(answerZones)}
        data-qa="plugin-dropzone-image-add-answer-zone-button"
      >
        {dropzoneImageStrings.addDropZone}
      </button>

      <DraggableArea accept="none" className="mt-4">
        {correctAnswers.length === 0 && (
          <span className="text-sm text-gray-600">
            {dropzoneImageStrings.answers.answersPlaceholder}
          </span>
        )}
        {correctAnswers.map((possibleAnswer, index) => (
          <DraggableAnswer
            key={index}
            answer={possibleAnswer}
            data-qa="plugin-dropzone-image-correct-possible-answer"
          />
        ))}
      </DraggableArea>
    </div>
  )
}
