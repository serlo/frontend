import { DraggableArea } from '@editor/editor-ui/exercises/draggable-area'

import type { DropzoneImageProps } from '../..'
import { convertAnswer } from '../../utils/answer-zone'
import { DraggableAnswer } from '../shared/draggable-answer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface PossibleAnswersProps {
  answerZones: DropzoneImageProps['state']['answerZones']
  onClickAddAnswerZone: () => void
}

export function PossibleAnswers(props: PossibleAnswersProps) {
  const { answerZones, onClickAddAnswerZone } = props

  const dropzoneImageStrings = useEditorStrings().plugins.dropzoneImage

  const correctAnswers = answerZones
    .map(({ answers }) => answers.map(convertAnswer))
    .flat()

  return (
    <div className="mt-4">
      <button
        className="serlo-button-editor-primary"
        onClick={onClickAddAnswerZone}
        data-qa="plugin-dropzone-image-add-wrong-answer-button"
      >
        {dropzoneImageStrings.addDropZone}
      </button>

      <DraggableArea accept="none" className="mt-4">
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
