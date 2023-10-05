import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState } from 'react'

import type { ScMcExerciseRendererProps } from './renderer'
import { Feedback } from '@/components/content/exercises/feedback'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'

export function McRenderer({
  answers,
  idBase,
  onEvaluate,
  renderExtraAnswerContent,
}: ScMcExerciseRendererProps) {
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedArray, setSelectedArray] = useState(answers.map(() => false))
  const exStrings = useInstanceData().strings.content.exercises

  const correctCount = answers.filter((answer) => answer.isCorrect).length
  const selectedCount = selectedArray.filter(Boolean).length
  const selectedCorrectCount = answers.filter(
    (answer, i) => answer.isCorrect && selectedArray[i]
  ).length
  const selectedFalseCount = selectedCount - selectedCorrectCount
  const allCorrect =
    selectedCorrectCount === correctCount && selectedFalseCount === 0
  const missedSome =
    selectedCorrectCount > 0 && !allCorrect && selectedFalseCount === 0

  return (
    <div className="mx-side mb-block">
      <ul className="unstyled-list m-0 flex list-none flex-col flex-wrap overflow-auto p-0">
        {answers.map((answer, i) => {
          const id = `${idBase}${i}`
          return (
            <li key={id} className="mb-block">
              <div className="flex">
                <input
                  className="w-0.25 opacity-0"
                  id={id}
                  type="checkbox"
                  checked={selectedArray[i]}
                  onChange={() => {
                    setShowFeedback(false)
                    const newArr = selectedArray.slice(0)
                    newArr[i] = !newArr[i]
                    setSelectedArray(newArr)
                  }}
                />
                <label
                  className={clsx(
                    /* we override some styles in the answer content to show it inline */
                    'flex cursor-pointer items-center [&_.slate-container]:mb-0 [&_.slate-p]:ml-2'
                  )}
                  htmlFor={id}
                >
                  <FaIcon
                    icon={selectedArray[i] ? faCheckSquare : faSquare}
                    className="mt-0.5 text-xl text-brand"
                  />
                  {answer.content}
                </label>
              </div>
              {showFeedback && selectedArray[i] ? answer.feedback : null}
              {renderExtraAnswerContent
                ? renderExtraAnswerContent(answer, !!answer.feedback)
                : null}
            </li>
          )
        })}
      </ul>
      <div className="mt-5 flex">
        <button
          className="serlo-button-blue mb-5 mr-3"
          onClick={() => {
            setShowFeedback(true)
            if (onEvaluate) onEvaluate(allCorrect, 'mc')
          }}
        >
          {exStrings.check}
        </button>
        {showFeedback && (
          <Feedback correct={allCorrect} missedSome={missedSome} />
        )}
      </div>
    </div>
  )
}
