import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useState } from 'react'

import { BlankDraggableDummyAnswer } from './blank-draggable-dummy-answer'
import type { FillInTheBlanksExerciseProps } from '..'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface BlankDraggableDummyAreaProps {
  extraDraggableAnswers: FillInTheBlanksExerciseProps['state']['extraDraggableAnswers']
}

export function BlankDraggableDummyArea(props: BlankDraggableDummyAreaProps) {
  const { extraDraggableAnswers } = props

  const [hoveredAnswer, setHoveredAnswer] = useState<number | null>(null)

  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  const dummyValues = extraDraggableAnswers.map(({ answer }) => answer.value)

  return (
    <div className="mt-8 px-4">
      {blanksExerciseStrings.dummyAnswers}:
      <div
        className="flex flex-wrap"
        onMouseLeave={() => {
          setTimeout(() => {
            setHoveredAnswer(null)
          }, 300)
        }}
      >
        {dummyValues.map((answer, index) => (
          <BlankDraggableDummyAnswer
            key={index}
            text={answer}
            isInHoverMode={hoveredAnswer === index}
            onMouseEnter={() => {
              setHoveredAnswer(index)
            }}
            onChange={(event) => {
              extraDraggableAnswers[index].answer.set(event.target.value)
            }}
            onRemove={() => {
              extraDraggableAnswers.remove(index)
            }}
          />
        ))}
      </div>
      <button
        onMouseDown={() => {
          extraDraggableAnswers.insert()
        }}
        className="serlo-button-editor-secondary mt-3"
      >
        <FaIcon icon={faPlus} /> {blanksExerciseStrings.addDummyAnswer}
      </button>
    </div>
  )
}
