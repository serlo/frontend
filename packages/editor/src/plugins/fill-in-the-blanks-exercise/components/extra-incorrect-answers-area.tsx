import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useRef } from 'react'

import { ExtraIncorrectAnswer } from './extra-incorrect-answer'
import type { FillInTheBlanksExerciseProps } from '..'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface ExtraIncorrectAnswersAreaProps {
  extraDraggableAnswers: FillInTheBlanksExerciseProps['state']['extraDraggableAnswers']
}

export function ExtraIncorrectAnswersArea(
  props: ExtraIncorrectAnswersAreaProps
) {
  const { extraDraggableAnswers } = props

  const areaRef = useRef<HTMLDivElement>(null)
  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  const incorrectAnswers = extraDraggableAnswers.defined
    ? extraDraggableAnswers.map(({ answer }) => answer.value)
    : []

  return (
    <div className="mt-8 px-8" ref={areaRef}>
      {incorrectAnswers.length > 0 && extraDraggableAnswers.defined ? (
        <>
          {blanksExerciseStrings.dummyAnswers}:
          <div className="mb-4 mt-1 flex flex-wrap gap-2">
            {incorrectAnswers.map((answer, index) => (
              <ExtraIncorrectAnswer
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
                  if (!extraDraggableAnswers.defined) return
                  // the editor overwrites the remove function of the `list()` if it's inside a `optional()`
                  // so this is a little helper to remove the value at the index
                  extraDraggableAnswers.set((currentList) =>
                    currentList.filter((_, itemIndex) => itemIndex !== index)
                  )
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
          if (extraDraggableAnswers.defined) {
            extraDraggableAnswers.insert()
          } else {
            extraDraggableAnswers.create([{ answer: '' }])
          }
        }}
        className="serlo-button-editor-secondary"
      >
        <FaIcon icon={faPlus} /> {blanksExerciseStrings.addDummyAnswer}
      </button>
    </div>
  )
}
