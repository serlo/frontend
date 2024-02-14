import { AutogrowInput } from '@editor/editor-ui/autogrow-input'
import { RemovableInputWrapper } from '@editor/editor-ui/removable-input-wrapper'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useRef } from 'react'

import type { BlanksTableProps } from '..'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface ExtraIncorrectAnswersProps {
  extraDraggableAnswers: BlanksTableProps['state']['extraDraggableAnswers']
}

export function ExtraIncorrectAnswers(props: ExtraIncorrectAnswersProps) {
  const { extraDraggableAnswers } = props

  const areaWrapper = useRef<HTMLDivElement>(null)
  // TODO: use blanksTable strings
  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  const incorrectAnswers = extraDraggableAnswers.defined
    ? extraDraggableAnswers.map(({ answer }) => answer.value)
    : []

  function handleExtraIncorrectAnswerAdd() {
    if (extraDraggableAnswers.defined) {
      extraDraggableAnswers.insert()
    } else {
      extraDraggableAnswers.create([{ answer: '' }])
    }
    setTimeout(() => {
      const inputs = areaWrapper.current?.querySelectorAll('input')
      inputs?.[inputs.length - 1].focus()
    }, 10)
  }

  function handleExtraIncorrectAnswerRemove(index: number) {
    if (!extraDraggableAnswers.defined) return
    // The editor overwrites the remove function of a `list` if
    // it's inside a `optional`. This removes the value at the index
    extraDraggableAnswers.set((currentList) =>
      currentList.filter((_, itemIndex) => itemIndex !== index)
    )
    // Focus new last input to persist focus
    const allInputs = areaWrapper.current?.querySelectorAll('input')
    if (allInputs) {
      void [...allInputs]?.at(-2)?.focus()
    }
  }

  return (
    <div className="mt-8 px-8" ref={areaWrapper}>
      {incorrectAnswers.length > 0 && extraDraggableAnswers.defined ? (
        <>
          {blanksExerciseStrings.dummyAnswers}:
          <div className="mb-4 mt-1 flex flex-wrap gap-2">
            {incorrectAnswers.map((answer, index) => (
              <RemovableInputWrapper
                key={index}
                tooltipText={blanksExerciseStrings.removeDummyAnswer}
                onRemoveClick={() => {
                  handleExtraIncorrectAnswerRemove(index)
                }}
              >
                <AutogrowInput
                  value={answer}
                  className="serlo-input-font-reset focus:border-red-400 focus:outline-red-400"
                  onChange={(event) => {
                    extraDraggableAnswers[index].answer.set(event.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      extraDraggableAnswers.insert()
                    }
                  }}
                  onBlur={() => {
                    extraDraggableAnswers.forEach(({ answer }, index) => {
                      const trimmedAnswer = answer.value.trim()
                      if (!trimmedAnswer.length) {
                        handleExtraIncorrectAnswerRemove(index)
                      } else answer.set(trimmedAnswer)
                    })
                  }}
                />
              </RemovableInputWrapper>
            ))}
          </div>
        </>
      ) : null}
      <button
        onClick={handleExtraIncorrectAnswerAdd}
        className="serlo-button-editor-secondary"
      >
        <FaIcon icon={faPlus} /> {blanksExerciseStrings.addDummyAnswer}
      </button>
    </div>
  )
}
