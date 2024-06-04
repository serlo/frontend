import { BlankDraggableArea } from '@editor/plugins/blanks-exercise/components/blank-draggable-area'

import { DraggableAnswer } from './draggable-answer'
import type { PossibleAnswerType } from '../../types'

interface PossibleAnswersProps {
  possibleAnswers: PossibleAnswerType[]
  canEdit?: boolean
  onClickEdit?: (id: string) => void
}

export function PossibleAnswers(props: PossibleAnswersProps) {
  const { possibleAnswers, canEdit, onClickEdit } = props
  return (
    <>
      <BlankDraggableArea onDrop={() => {}}>
        {possibleAnswers
          .filter((p) => p !== undefined)
          .map((possibleAnswer, index) => {
            return (
              <DraggableAnswer
                draggableId={possibleAnswer.id}
                canEdit={canEdit}
                onClickEdit={onClickEdit}
                key={index}
                imageUrl={possibleAnswer.imageUrl}
                text={possibleAnswer.text}
              />
            )
          })}
      </BlankDraggableArea>
    </>
  )
}
