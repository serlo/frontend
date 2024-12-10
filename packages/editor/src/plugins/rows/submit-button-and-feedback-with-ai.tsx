import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { AnimateChangeInHeight } from '../text-area-exercise/animate-change-in-height'
import { PrototypeStateStore } from '../text-area-exercise/prototype-state'

export interface FinalFeedback {
  generalFeedback: string
  specificFeedbacks: {
    subject: string
    suggestion: string
  }[]
}

export function SubmitButtonAndFeedback() {
  const [showFeedback, setShowFeedback] = useState(false)
  const [triesLeft, setTriesLeft] = useState(3)
  const [aiFeedback, setAiFeedback] = useState<FinalFeedback | null>()

  const plugins = PrototypeStateStore.useState((s) => s.textAreaPlugins)

  async function fetchFeedback() {
    const url = new URL('/api/ai/final-feedback', window.location.href)

    let studentSolution = ''

    for (const plugin in plugins) {
      studentSolution +=
        plugins[plugin].textAreaBlocks.map((block) => block.content).join(' ') +
        ' '
    }

    const exercise = `
    Writing your opinion: Should students have homework every day?
    You will write your opinion divided into three tasks: A beginning, a middle and an end.
    - Write between 50-75 words.
  
    - Use 3 useful phrases to structure your text.
  
    - Use 3-5 linking words.
    `

    const response = await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({
        exercise,
        studentSolution,
      }),
    })

    if (!response.ok) {
      console.error('Network response was not ok', response)
      return null
    }

    return (await response.json()) as FinalFeedback
  }

  return (
    <div className="">
      <AnimateChangeInHeight className="">
        <button
          onClick={() => {
            setTriesLeft((previous) => previous - 1)
            fetchFeedback()
              .then((data) => {
                setAiFeedback(data)
                setShowFeedback(true)
              })
              .catch((e) => {
                console.error(e)
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
                <div>{aiFeedback?.generalFeedback}</div>
                <div className="flex flex-col gap-3">
                  {aiFeedback?.specificFeedbacks.map((entry, index) => (
                    <div key={index}>
                      <div className="flex flex-row items-center gap-1 ">
                        <FaIcon
                          icon={faTriangleExclamation}
                          className="text-purple-400"
                        />
                        <a
                          href="#feedback-criteria"
                          className="text-brand-700"
                        >{`${entry.subject}`}</a>
                      </div>
                      {entry.suggestion ? (
                        <div className="flex flex-row gap-1 ">
                          ⮕{' '}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: entry.suggestion,
                            }}
                          />
                        </div>
                      ) : null}
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
