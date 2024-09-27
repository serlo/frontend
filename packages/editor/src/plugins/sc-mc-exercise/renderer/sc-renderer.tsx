import { ExerciseFeedback } from '@editor/editor-ui/exercises/exercise-feedback'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { cn } from '@editor/utils/cn'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { ScMcExerciseRendererProps } from './renderer'

export function ScRenderer({
  answers,
  renderExtraAnswerContent,
  isPrintMode,
}: ScMcExerciseRendererProps) {
  const [selected, setSelected] = useState<number | undefined>(undefined)
  const [showFeedback, setShowFeedback] = useState(false)
  const exStrings = useStaticStrings().plugins.exercise

  return (
    <div className="mx-side mb-block">
      <ul className="unstyled-list m-0 flex list-none flex-col flex-wrap overflow-auto p-0">
        {answers.map((answer, i) => {
          const id = answer.key
          return (
            <li key={id} className="mb-block">
              <div className="flex">
                <input
                  className="w-0.25 opacity-0"
                  id={id}
                  type="radio"
                  checked={selected === i}
                  onChange={() => {
                    setShowFeedback(false)
                    setSelected(i)

                    editorLearnerEvent.trigger?.({
                      verb: 'interacted',
                      value: i,
                      contentType: 'sc-exercise',
                    })
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setShowFeedback(true)
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
                    icon={selected === i ? faCheckCircle : faCircle}
                    className="mt-0.5 text-xl text-brand"
                  />
                  {answer.content}
                </label>
              </div>
              {renderExtraAnswerContent
                ? renderExtraAnswerContent(answer, true)
                : null}
            </li>
          )
        })}
      </ul>

      <div className="mt-5 flex">
        <button
          className={cn(
            'serlo-button-blue mb-5 mr-3 h-8',
            selected === undefined &&
              'pointer-events-none bg-transparent text-gray-400 opacity-100'
          )}
          data-qa="plugin-exercise-check-answer-button"
          onClick={() => {
            setShowFeedback(true)
            editorLearnerEvent.trigger?.({
              verb: 'answered',
              correct: answers[selected ?? 0].isCorrect,
              value: selected,
              contentType: 'sc-exercise',
            })
          }}
        >
          {selected !== undefined
            ? exStrings.check
            : isPrintMode
              ? exStrings.printModeChooseOption
              : exStrings.chooseOption}
        </button>
        {showFeedback && selected !== undefined && answers[selected] ? (
          <ExerciseFeedback correct={answers[selected].isCorrect}>
            {answers[selected].feedback}
          </ExerciseFeedback>
        ) : null}
      </div>
    </div>
  )
}
