import { ExerciseFeedback } from '@editor/editor-ui/exercises/exercise-feedback'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { cn } from '@editor/utils/cn'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { ScMcExerciseRendererProps } from './renderer'

export function McRenderer({
  answers,
  renderExtraAnswerContent,
}: ScMcExerciseRendererProps) {
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedArray, setSelectedArray] = useState(answers.map(() => false))
  const exStrings = useStaticStrings().plugins.exercise

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
          const id = answer.key
          return (
            <li key={id}>
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

                    editorLearnerEvent.trigger?.({
                      verb: 'interacted',
                      value: i,
                      contentType: 'mc-exercise',
                    })
                  }}
                />
                <label
                  className={cn(
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
              <i className="block min-h-8 text-gray-600">
                {showFeedback && selectedArray[i] ? (
                  <span className="animate-in slide-in-from-top">
                    {answer.feedback}
                  </span>
                ) : null}
              </i>
              {renderExtraAnswerContent
                ? renderExtraAnswerContent(answer, !!answer.feedback)
                : null}
            </li>
          )
        })}
      </ul>
      <div className="mt-2 flex">
        <button
          data-qa="plugin-exercise-check-answer-button"
          className="serlo-button-blue mr-3 h-8"
          onClick={() => {
            setShowFeedback(true)
            editorLearnerEvent.trigger?.({
              verb: 'answered',
              correct: allCorrect,
              // value: selected,
              contentType: 'mc-exercise',
            })
          }}
        >
          {exStrings.check}
        </button>
        {showFeedback && (
          <ExerciseFeedback correct={allCorrect} missedSome={missedSome} />
        )}
      </div>
    </div>
  )
}
