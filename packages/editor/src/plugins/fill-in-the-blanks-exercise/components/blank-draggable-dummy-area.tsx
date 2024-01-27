import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'

import { BlankDraggableDummyAnswer } from './blank-draggable-dummy-answer'
import type { FillInTheBlanksExerciseProps } from '..'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface BlankDraggableDummyAreaProps {
  additionalDraggableAnswers: FillInTheBlanksExerciseProps['state']['additionalDraggableAnswers']
}

export function BlankDraggableDummyArea(props: BlankDraggableDummyAreaProps) {
  const { additionalDraggableAnswers } = props

  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  const dummyDraggables = additionalDraggableAnswers.map(
    ({ answer }) => answer.value
  )

  function handleDummyAnswerAdd() {
    additionalDraggableAnswers.insert(additionalDraggableAnswers.length, {
      answer: '',
    })
  }

  function handleRemoveDummyAnswer(index: number) {
    additionalDraggableAnswers.remove(index)
  }

  function handleDummyAnswerChange(text: string, index: number) {
    additionalDraggableAnswers[index].answer.set(text)
  }

  return (
    <div className="mt-8 px-4">
      {blanksExerciseStrings.dummyAnswers}:
      <div className="flex min-h-8 flex-wrap items-stretch">
        {dummyDraggables.map((answer, index) => (
          <BlankDraggableDummyAnswer
            key={index}
            text={answer}
            onChange={(event) => {
              handleDummyAnswerChange(event.target.value, index)
            }}
            onRemove={() => {
              handleRemoveDummyAnswer(index)
            }}
          />
        ))}
      </div>
      <button
        onMouseDown={handleDummyAnswerAdd}
        className="serlo-button-editor-secondary mt-3"
      >
        <FaIcon icon={faPlus} /> {blanksExerciseStrings.addDummyAnswer}
      </button>
    </div>
  )
}
