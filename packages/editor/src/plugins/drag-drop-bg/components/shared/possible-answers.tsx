import { BlankDraggableArea } from '@editor/plugins/blanks-exercise/components/blank-draggable-area'

import { DraggableAnswer } from './draggable-answer'
import type { PossibleAnswerType } from '../../types'

interface PossibleAnswersProps {
  possibleAnswers: PossibleAnswerType[]
  canEdit?: boolean
  onClickEdit?: (id: string) => void
  onClickAddWrongAnswer?: () => void
}

export function PossibleAnswers(props: PossibleAnswersProps) {
  const { possibleAnswers, canEdit, onClickEdit, onClickAddWrongAnswer } = props

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
        <div className="flex justify-center">
          <button
            onClick={() => onClickAddWrongAnswer && onClickAddWrongAnswer()}
            className="rounded bg-orange-100 px-4 py-2"
          >
            Add alternative answer
          </button>
        </div>
      </BlankDraggableArea>
    </>
  )
}
