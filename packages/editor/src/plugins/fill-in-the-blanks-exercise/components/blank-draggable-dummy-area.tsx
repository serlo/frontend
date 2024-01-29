import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useRef } from 'react'

import { BlankDraggableDummyAnswer } from './blank-draggable-dummy-answer'
import type { FillInTheBlanksExerciseProps } from '..'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface BlankDraggableDummyAreaProps {
  extraDraggableAnswers: FillInTheBlanksExerciseProps['state']['extraDraggableAnswers']
}

export function BlankDraggableDummyArea(props: BlankDraggableDummyAreaProps) {
  const { extraDraggableAnswers } = props

  const areaRef = useRef<HTMLDivElement>(null)
  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  const dummyValues = extraDraggableAnswers.map(({ answer }) => answer.value)

  return (
    <div className="mt-8 px-4" ref={areaRef}>
      {dummyValues.length > 0 ? (
        <>
          {blanksExerciseStrings.dummyAnswers}:
          <div className="flex flex-wrap">
            {dummyValues.map((answer, index) => (
              <BlankDraggableDummyAnswer
                key={index}
                text={answer}
                onChange={(event) => {
                  extraDraggableAnswers[index].answer.set(event.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    extraDraggableAnswers.insert()
                  }
                }}
                onRemoveClick={() => {
                  extraDraggableAnswers.remove(index)
                  // focus new last input to make sure we don't loose focus
                  const allInputs = areaRef.current?.querySelectorAll('input')
                  if (allInputs) {
                    void [...allInputs]?.at(-2)?.focus()
                  }
                }}
              />
            ))}
          </div>
        </>
      ) : null}
      <button
        onClick={() => {
          extraDraggableAnswers.insert()
        }}
        className="serlo-button-editor-secondary mt-3"
      >
        <FaIcon icon={faPlus} /> {blanksExerciseStrings.addDummyAnswer}
      </button>
    </div>
  )
}
