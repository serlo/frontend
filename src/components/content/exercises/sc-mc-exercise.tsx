import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle'
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons/faCheckSquare'
import clsx from 'clsx'
import { useState, Fragment } from 'react'

import { Feedback } from './feedback'
import { FaIcon } from '@/components/fa-icon'
import { isPrintMode } from '@/components/print-mode'
import { useInstanceData } from '@/contexts/instance-context'
import { EdtrPluginScMcExercise } from '@/data-types'
import { NodePath, RenderNestedFunction } from '@/schema/article-renderer'

export interface ScMcExerciseProps {
  state: EdtrPluginScMcExercise['state']
  idBase: string
  renderNested: RenderNestedFunction
  path?: NodePath
  isRevisionView?: boolean
}

export function ScMcExercise({
  state,
  idBase,
  renderNested,
  isRevisionView,
}: ScMcExerciseProps) {
  const { strings } = useInstanceData()
  const answers = state.answers.slice(0)
  const [selected, setSelected] = useState<number | undefined>(undefined)
  const [showFeedback, setShowFeedback] = useState(false)
  const [focused, setFocused] = useState<number | undefined>(undefined)
  const [selectedArray, setSelectedArray] = useState(answers.map(() => false))

  if (state.isSingleChoice) return renderSingleChoice()

  return renderMultipleChoice()

  function renderSingleChoice() {
    return (
      <div className="mx-side mb-block">
        <ul className="flex flex-col flex-wrap p-0 m-0 list-none overflow-auto">
          {answers.map((answer, i) => {
            const id = `${idBase}${i}`
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
                      if (e.key == 'Enter') setShowFeedback(true)
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
                {showFeedback &&
                  selected !== undefined &&
                  answers[selected] &&
                  answers[selected] === answer && (
                    <Feedback correct={answers[selected].isCorrect}>
                      {renderNested(
                        answers[selected].feedback,
                        `scfeedback${selected}`
                      )}
                    </Feedback>
                  )}
                {isRevisionView && renderRevisionExtra(answer)}
              </Fragment>
            )
          })}
        </ul>

        <button
          className={clsx(
            'serlo-button serlo-make-interactive-primary',
            'mt-4',
            selected === undefined &&
              'opacity-100 bg-transparent text-gray-400 pointer-events-none'
          )}
          onClick={() => {
            setShowFeedback(true)
          }}
          //blur-hack, use https://caniuse.com/#feat=css-focus-visible when supported
          onPointerUp={(e) => e.currentTarget.blur()}
        >
          {selected !== undefined
            ? strings.content.check
            : isPrintMode
            ? strings.content.printModeChooseOption
            : strings.content.chooseOption}
        </button>
      </div>
    )
  }

  function renderMultipleChoice() {
    const correct = answers.every(
      (answer, i) => answer.isCorrect === selectedArray[i]
    )
    return (
      <div className="mx-side mb-block">
        <ul className="flex flex-col flex-wrap p-0 m-0 list-none overflow-auto">
          {answers.map((answer, i) => {
            const id = `${idBase}${i}`

            const hasFeedback =
              answer.feedback[0]?.children &&
              answer.feedback[0].children.length > 0

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
        {showFeedback && <Feedback correct={correct} />}
        <button
          className="serlo-button serlo-make-interactive-primary mt-4"
          onClick={() => {
            setShowFeedback(true)
          }}
          onPointerUp={(e) => e.currentTarget.blur()}
        >
          {strings.content.check}
        </button>
      </div>
    )
  }

  function renderRevisionExtra(
    answer: EdtrPluginScMcExercise['state']['answers'][0],
    hasFeedback?: boolean
  ) {
    if (!answer.isCorrect && !hasFeedback) return null
    return (
      <div className="bg-yellow-200 rounded-xl py-2 mb-4 serlo-revision-extra-info">
        {answer.isCorrect && (
          <span className="font-bold text-sm mx-side">
            [{strings.content.right}]
          </span>
        )}
        {renderNested(answer.feedback, `mcfeedbackrevision`)}
      </div>
    )
  }
}
