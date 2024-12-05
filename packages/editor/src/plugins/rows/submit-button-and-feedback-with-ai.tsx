import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { AnimateChangeInHeight } from '../text-area-exercise/animate-change-in-height'
import { PrototypeStateStore } from '../text-area-exercise/prototype-state'
import { AiFeedback } from '../text-area-exercise/types'

export function SubmitButtonAndFeedback() {
  const [showFeedback, setShowFeedback] = useState(false)
  const [triesLeft, setTriesLeft] = useState(3)
  const [aiFeedback, setAiFeedback] = useState<AiFeedback[]>([])

  async function fetchFeedback({
    exercise,
    solution,
    evaluationCriteria,
    studentSolution,
  }: {
    exercise: string
    solution: string
    evaluationCriteria: string
    studentSolution: string
  }) {
    const url = new URL('/api/ai/student-feedback', window.location.href)

    const response = await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({
        exercise,
        solution: solution || 'keine Musterlösung',
        evaluationCriteria: evaluationCriteria || 'keine Bewertungskriterien',
        // Maybe do it per paragraph like in the original prototype?
        studentSolution: studentSolution || '',
      }),
    })

    if (!response.ok) {
      console.error('Network response was not ok', response)
      return null
    }

    return (await response.json()) as AiFeedback
  }

  const plugins = PrototypeStateStore.useState((s) => s.textAreaPlugins)

  const exercises = [
    'Should students have homework every day? - Write the beginning of your opinion on the question above.',
    'Should students have homework every day? - Write the middle of your opinion.',
    'Should students have homework every day? - Write the end of your opinion.',
  ]

  async function fetchFeedbacks() {
    return await Promise.all(
      Object.entries(plugins).map(async ([key, value], index) => {
        return (await fetchFeedback({
          studentSolution: value.textAreaBlocks
            .map((block) => block.content)
            .join(' '),
          evaluationCriteria: plugins[key].evaluationCriteria as string,
          exercise: exercises[index],
          solution: plugins[key].solution as string,
        })) as AiFeedback
      })
    )
  }

  return (
    <div className="">
      <AnimateChangeInHeight className="">
        <button
          onClick={() => {
            setTriesLeft((previous) => previous - 1)
            fetchFeedbacks()
              .then((data) => {
                setAiFeedback(data)
                setShowFeedback(true)
              })
              .catch((e) => {
                console.log(e)
              })
          }}
          className={cn(
            'mb-3 rounded-md bg-brand-100 px-16 pb-4 pt-4 font-bold',
            'hover:cursor-pointer hover:bg-brand-200'
          )}
        >
          Zur Rückmeldung abschicken ({triesLeft})
        </button>
        {showFeedback ? (
          <div className="fixed bottom-0 left-0 z-50 flex w-full flex-col items-center p-3">
            <div className="flex max-w-[50rem] flex-row gap-3 rounded-md bg-purple-200 p-3 shadow-plugin-focus">
              <img src="/_assets/img/birdie.svg" className="max-w-10" />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  {aiFeedback.map((entry, index) => (
                    <div key={index}>
                      <div className="flex flex-row items-center gap-1 ">
                        <FaIcon
                          icon={faTriangleExclamation}
                          className="text-purple-400"
                        />
                        {/* <a
                          href="#feedback-criteria"
                          className="text-brand-700"
                        >{`${entry.title}`}</a> */}
                      </div>
                      <div>
                        <span key={index}>{entry.generalFeedback}</span>
                      </div>
                      {/* {entry.suggestion ? (
                        <div className="flex flex-row gap-1 ">
                          ⮕ {entry.suggestion}
                        </div>
                      ) : null} */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </AnimateChangeInHeight>
    </div>
  )
}
