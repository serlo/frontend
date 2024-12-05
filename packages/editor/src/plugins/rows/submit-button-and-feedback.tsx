import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { AnimateChangeInHeight } from '../text-area-exercise/animate-change-in-height'

const aiFeedback = {
  feedbackStart:
    'Dein Text zeigt, dass du eine klare Meinung hast, und du hast schon gute Ansätze gezeigt, deine Argumente zu formulieren.',
  feedback: [
    {
      title: '"Write between 50-75 words"',
      feedback: [
        'Dein Text umfasst ungefähr 40 Wörter und ist damit etwas zu kurz. Versuche, ein paar Sätze hinzuzufügen, um zwischen 50 und 75 Wörtern zu erreichen.',
      ],
      isCorrect: false,
    },
    {
      title: '"Use 3-5 linking words"',
      feedback: [
        'Du hast einige Verbindungen genutzt, aber es fehlen Verbindungswörter, um die Sätze besser zu verbinden.',
      ],
      suggestion:
        "Nutze Wörter wie 'because', 'however', oder 'and' öfter, um deine Gedanken flüssiger darzustellen.",
      isCorrect: false,
    },
    {
      title: 'Language',
      feedback: [
        'Achte darauf, dass deine Sätze vollständig und präzise sind. Zum Beispiel könnte ',
        {
          type: 'link',
          text: "'Students must time for hobbies'",
          href: '#students-must-time-for-hobbies',
        },
        " umformuliert werden zu: 'Students need time for hobbies because they are important.'",
      ],
      suggestion: '',
      isCorrect: false,
    },
  ],
}

export function SubmitButtonAndFeedback() {
  const [showFeedback, setShowFeedback] = useState(false)
  const [triesLeft, setTriesLeft] = useState(3)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dots, setDots] = useState('')

  const handleButtonClick = () => {
    setIsSubmitting(true)
    setTriesLeft((previous) => previous - 1)

    // Cheap animation . => .. => ... => (repeat)
    let dotCount = 0
    const interval = setInterval(() => {
      setDots('.'.repeat((dotCount % 3) + 1))
      dotCount++
    }, 400)

    // Artificial timeout to make it look like birdie is thinking
    setTimeout(() => {
      clearInterval(interval)
      setDots('')
      setShowFeedback(true)
      setIsSubmitting(false)
    }, 1950)
  }

  return (
    <div className="">
      <AnimateChangeInHeight className="">
        <button
          onClick={handleButtonClick}
          disabled={isSubmitting}
          className={cn(
            // Fixed width so that the button does not move when we animate the dots
            'mb-3 w-[450px] max-w-[450px] rounded-md bg-brand-600 px-16 pb-4 pt-4 font-bold text-white',
            'hover:cursor-pointer hover:bg-brand-700',
            isSubmitting && 'cursor-not-allowed bg-brand-400'
          )}
        >
          {isSubmitting
            ? `Zur Rückmeldung abschicken${dots}`
            : `Zur Rückmeldung abschicken (${triesLeft})`}
        </button>

        {showFeedback ? (
          <div className="fixed bottom-0 left-0 z-50 flex w-full flex-col items-center p-3">
            <div className="flex max-w-[50rem] flex-row gap-5 rounded-md bg-purple-200 p-5 shadow-plugin-focus">
              <img src="/_assets/img/birdie.svg" className="max-w-16" />
              <div className="flex flex-col gap-3">
                <div>{aiFeedback.feedbackStart}</div>
                <div className="flex flex-col gap-3">
                  {aiFeedback.feedback.map((entry, index) => (
                    <div key={index}>
                      <div className="flex flex-row items-center gap-1 ">
                        <FaIcon
                          icon={faTriangleExclamation}
                          className="text-purple-500"
                        />
                        <a
                          href="#feedback-criteria"
                          className="underline"
                        >{`${entry.title}`}</a>
                      </div>
                      <div>
                        {entry.feedback.map((elem, index) => {
                          if (typeof elem === 'object' && 'type' in elem) {
                            return (
                              <a
                                key={index}
                                href={elem.href}
                                className="underline"
                              >
                                {elem.text}
                              </a>
                            )
                          }
                          return <span key={index}>{elem}</span>
                        })}
                      </div>
                      {entry.suggestion ? (
                        <div className="flex flex-row gap-1 ">
                          ⮕ {entry.suggestion}
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
