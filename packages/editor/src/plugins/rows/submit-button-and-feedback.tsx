import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { AnimateChangeInHeight } from '../text-area-exercise/animate-change-in-height'

const aiFeedback = {
  feedbackStart:
    'Dein Text zeigt, dass du eine klare Meinung hast. Es gibt eine Struktur mit Anfang, Mitte und Ende, aber einige wichtige Anforderungen wurden nicht erfüllt.',
  feedback: [
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
      title: 'Inhalt',
      feedback: [
        'Dein Schlusssatz ',
        {
          type: 'link',
          text: "'In conclusion, I think there should be homework every day.'",
          href: '#jump-to-feedback',
        },
        ' widerspricht deiner Argumentation im Text.',
      ],
      suggestion:
        'Überlege dir, ob du hier klarer ausdrücken möchtest, dass du gegen tägliche Hausaufgaben bist.',
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
                              <button
                                onClick={() =>
                                  scrollToTextAreaContaining(
                                    elem.text
                                      .replaceAll("'", '')
                                      .replaceAll('"', '')
                                  )
                                }
                                key={index}
                                className="underline"
                              >
                                {elem.text}
                              </button>
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

  function scrollToTextAreaContaining(text: string) {
    // Find the textarea with the target content
    const targetTextarea = Array.from(
      document.querySelectorAll('textarea')
    ).find((textarea) => textarea.value === text)

    // Scroll into view if found
    if (targetTextarea) {
      targetTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}
