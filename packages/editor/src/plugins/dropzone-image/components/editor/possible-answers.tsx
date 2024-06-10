import { DraggableArea } from '@editor/editor-ui/exercises/draggable-area'

import type { DropzoneImageProps } from '../..'
import { convertAnswer } from '../../utils/answer-zone'
import { DraggableAnswer } from '../shared/draggable-answer'

interface PossibleAnswersProps {
  answerZones: DropzoneImageProps['state']['answerZones']
}

export function PossibleAnswers(props: PossibleAnswersProps) {
  const { answerZones } = props

  const correctAnswers = answerZones
    .map(({ answers }) => answers.map(convertAnswer))
    .flat()

  return (
    <DraggableArea accept="none" className="mt-4">
      {correctAnswers.map((possibleAnswer, index) => (
        <DraggableAnswer
          data-qa="plugin-dropzone-image-correct-possible-answer"
          draggableId={possibleAnswer.id}
          key={index}
          imageUrl={possibleAnswer.imageUrl}
          text={possibleAnswer.text}
        />
      ))}
    </DraggableArea>
  )
}
