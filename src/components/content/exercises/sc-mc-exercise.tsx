import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useState, Fragment } from 'react'

import { Feedback } from './feedback'
import { FaIcon } from '@/components/fa-icon'
import { isPrintMode } from '@/components/print-mode'
import { useInstanceData } from '@/contexts/instance-context'
import { EdtrPluginScMcExercise } from '@/frontend-node-types'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { hasVisibleContent } from '@/helper/has-visible-content'
import { RenderNestedFunction } from '@/schema/article-renderer'

export interface ScMcExerciseProps {
  state: EdtrPluginScMcExercise['state']
  idBase: string
  renderNested: RenderNestedFunction
  isRevisionView?: boolean
  context: {
    entityId: number
    revisionId: number
  }
}

export function ScMcExercise({
  state,
  idBase,
  renderNested,
  isRevisionView,
  context,
}: ScMcExerciseProps) {
  const answers = state.answers.slice(0)
  const [selected, setSelected] = useState<number | undefined>(undefined)
  const [showFeedback, setShowFeedback] = useState(false)
  const [focused, setFocused] = useState<number | undefined>(undefined)
  const [selectedArray, setSelectedArray] = useState(answers.map(() => false))
  const exStrings = useInstanceData().strings.content.exercises

  const { asPath } = useRouter()

  if (state.isSingleChoice) return renderSingleChoice()

  return renderMultipleChoice()

  function renderSingleChoice() {
    return (
      <div className="mx-side mb-block">
        <ul className="flex flex-col flex-wrap p-0 m-0 list-none overflow-auto">
          {answers.map((answer, i) => {
            const id = `${idBase}${i}`

            const showFeedbackForAnswer =
              showFeedback &&
              selected !== undefined &&
              answers[selected] &&
              answers[selected] === answer

            const { feedback, isCorrect } = answer
            const hasFeedback = hasVisibleContent(feedback)

            return (
              <Fragment key={i}>
                <li className="flex mb-block">
                  <input
                    className="opacity-0 w-0.25"
                    id={id}
                    type="radio"
                    checked={selected === i}
                    onChange={() => {
                      setShowFeedback(false)
                      setSelected(i)
                    }}
                    onFocus={() => setFocused(i)}
                    onBlur={() => setFocused(undefined)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setShowFeedback(true)
                    }}
                  />
                  <label
                    className={clsx('serlo-styled-label', {
                      'outline-gray': focused === i,
                    })}
                    htmlFor={id}
                  >
                    <FaIcon
                      icon={selected === i ? faCheckCircle : faCircle}
                      className="text-xl mt-0.5 text-brand"
                    />
                    {renderNested(answer.content, `scoption${i}`)}
                  </label>
                </li>
                {showFeedbackForAnswer ? (
                  <Feedback correct={isCorrect}>
                    {hasFeedback
                      ? renderNested(feedback, `scfeedback${selected}`)
                      : null}
                  </Feedback>
                ) : null}
                {isRevisionView && renderRevisionExtra(answer, true)}
              </Fragment>
            )
          })}
        </ul>

        <button
          className={clsx(
            'serlo-button-blue',
            'mt-4',
            selected === undefined &&
              'opacity-100 bg-transparent text-gray-400 pointer-events-none'
          )}
          onClick={() => {
            setShowFeedback(true)
            exerciseSubmission({
              path: asPath,
              entityId: context.entityId,
              revisionId: context.revisionId,
              result: answers[selected ?? 0].isCorrect ? 'correct' : 'wrong',
              type: 'sc',
            })
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
        <ul className="flex flex-col flex-wrap p-0 m-0 list-none overflow-auto">
          {answers.map((answer, i) => {
            const id = `${idBase}${i}`

            const hasFeedback = hasVisibleContent(answer.feedback)

            return (
              <Fragment key={i}>
                <li className="flex mb-block">
                  <input
                    className="opacity-0 w-0.25"
                    id={id}
                    type="checkbox"
                    checked={selectedArray[i]}
                    onChange={() => {
                      setShowFeedback(false)
                      const newArr = selectedArray.slice(0)
                      newArr[i] = !newArr[i]
                      setSelectedArray(newArr)
                    }}
                    onFocus={() => setFocused(i)}
                    onBlur={() => setFocused(undefined)}
                  />
                  <label
                    className={clsx('serlo-styled-label', {
                      'outline-gray': focused === i,
                    })}
                    htmlFor={id}
                  >
                    <FaIcon
                      icon={selectedArray[i] ? faCheckSquare : faSquare}
                      className="text-xl mt-0.5 text-brand"
                    />
                    {renderNested(answer.content, `mcoption${i}`)}
                  </label>
                </li>
                {showFeedback &&
                  selectedArray[i] &&
                  hasFeedback &&
                  renderNested(answer.feedback, `mcfeedback${i}`)}
                {isRevisionView && renderRevisionExtra(answer, hasFeedback)}
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
            exerciseSubmission({
              path: asPath,
              entityId: context.entityId,
              revisionId: context.revisionId,
              result: allCorrect ? 'correct' : 'wrong',
              type: 'mc',
            })
          }}
        >
          {exStrings.check}
        </button>
      </div>
    )
  }

  function renderRevisionExtra(
    answer: EdtrPluginScMcExercise['state']['answers'][0],
    hasFeedback?: boolean
  ) {
    if (
      !hasFeedback ||
      !hasVisibleContent(answer.feedback) ||
      !answer.feedback[0].children
    )
      return null
    return (
      <div className="bg-yellow-200 rounded-xl py-2 mb-4 serlo-revision-extra-info">
        {answer.isCorrect && (
          <span className="font-bold text-sm mx-side">
            [{exStrings.correct}]
          </span>
        )}
        {renderNested(answer.feedback[0].children, `mcfeedbackrevision`)}
      </div>
    )
  }
}
