/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BlankDraggableArea } from '@editor/plugins/blanks-exercise/components/blank-draggable-area'

import { DraggableAnswer } from './DraggableAnswer'
import type { PossibleAnswerType } from '../../types'

interface PossibleAnswersProps {
  possibleAnswers: PossibleAnswerType[]
  canEdit?: boolean
  onClickEdit?: (id: string) => void
}

// TODO: Styling
export function PossibleAnswers(props: PossibleAnswersProps) {
  const { possibleAnswers, canEdit, onClickEdit } = props
  return (
    <>
      <h1>{possibleAnswers.length}</h1>
      <BlankDraggableArea onDrop={() => {}}>
        {possibleAnswers.map((possibleAnswer, index) => {
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
