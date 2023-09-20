import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { Fragment, useState } from 'react'

import { Feedback } from '@/components/content/exercises/feedback'
import { FaIcon } from '@/components/fa-icon'
import { isPrintMode } from '@/components/print-mode'
import { useInstanceData } from '@/contexts/instance-context'
import { ExerciseSubmissionData } from '@/helper/exercise-submission'

export interface ScMcExerciseRendererAnswer {
  isCorrect: boolean
  feedback: JSX.Element | null
  content: JSX.Element | null
  originalIndex: number
}

export interface ScMcExerciseRendererProps {
  isSingleChoice: boolean
  idBase: string
  answers: ScMcExerciseRendererAnswer[]
  onEvaluate?: (correct: boolean, type: ExerciseSubmissionData['type']) => void
  renderExtraAnswerContent?: (
    answer: ScMcExerciseRendererAnswer,
    hasFeedback: boolean
  ) => JSX.Element | null
}

export function ScMcExerciseRenderer({
  answers,
  isSingleChoice,
  idBase,
  onEvaluate,
  renderExtraAnswerContent,
}: ScMcExerciseRendererProps) {
  const [selected, setSelected] = useState<number | undefined>(undefined)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedArray, setSelectedArray] = useState(answers.map(() => false))
  const exStrings = useInstanceData().strings.content.exercises

  return isSingleChoice ? renderSingleChoice() : renderMultipleChoice()

  function renderSingleChoice() {
    return (
      <div className="mx-side mb-block">
        <ul className="unstyled-list m-0 flex list-none flex-col flex-wrap overflow-auto p-0">
          {answers.map((answer, i) => {
            const id = `${idBase}${i}`

            const showFeedbackForAnswer =
              showFeedback &&
              selected !== undefined &&
              answers[selected] &&
              answers[selected] === answer

            const { feedback, isCorrect } = answer

            return (
              <Fragment key={i}>
                <li className="mb-block flex">
                  <input
                    className="w-0.25 opacity-0"
                    id={id}
                    type="radio"
                    checked={selected === i}
                    onChange={() => {
                      setShowFeedback(false)
                      setSelected(i)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setShowFeedback(true)
                    }}
                  />
                  <label
                    className={clsx(
                      /* we override some styles in the answer content to show it inline */
                      'flex cursor-pointer items-center [&_.slate-container]:mb-0 [&_.slate-p]:ml-2',
                    )}
                    htmlFor={id}
                  >
                    <FaIcon
                      icon={selected === i ? faCheckCircle : faCircle}
                      className="mt-0.5 text-xl text-brand"
                    />
                    {answer.content}
                  </label>
                </li>
                {showFeedbackForAnswer ? (
                  <Feedback correct={isCorrect}>{feedback}</Feedback>
                ) : null}
                {renderExtraAnswerContent
                  ? renderExtraAnswerContent(answer, true)
                  : null}
              </Fragment>
            )
          })}
        </ul>

        <button
          className={clsx(
            'serlo-button-blue mt-4',
            selected === undefined &&
            'pointer-events-none bg-transparent text-gray-400 opacity-100'
          )}
          onClick={() => {
            setShowFeedback(true)
            if (onEvaluate) onEvaluate(answers[selected ?? 0].isCorrect, 'sc')
          }}
        >
          {selected !== undefined
            ? exStrings.check
            : isPrintMode
              ? exStrings.printModeChooseOption
              : exStrings.chooseOption}
        </button>
      </div>
    )
  }

  function renderMultipleChoice() {
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
              <Fragment key={i}>
                <li className="mb-block flex">
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
                      'flex cursor-pointer items-center [&_.slate-container]:mb-0 [&_.slate-p]:ml-2',
                    )}
                    htmlFor={id}
                  >
                    <FaIcon
                      icon={selectedArray[i] ? faCheckSquare : faSquare}
                      className="mt-0.5 text-xl text-brand"
                    />
                    {answer.content}
                  </label>
                </li>
                {showFeedback && selectedArray[i] ? answer.feedback : null}
                {renderExtraAnswerContent
                  ? renderExtraAnswerContent(answer, !!answer.feedback)
                  : null}
              </Fragment>
            )
          })}
        </ul>
        {showFeedback && (
          <Feedback correct={allCorrect} missedSome={missedSome} />
        )}
        <button
          className="serlo-button-blue mt-4"
          onClick={() => {
            setShowFeedback(true)
            if (onEvaluate) onEvaluate(allCorrect, 'mc')
          }}
        >
          {exStrings.check}
        </button>
      </div>
    )
  }
}
