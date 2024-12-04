import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
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
      // suggestion:
      //   'Du könntest mehr Details zu deinen Argumenten hinzufügen, z. B. warum Hausaufgaben langweilig sind oder warum Hobbys so wichtig sind.',
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

  return (
    <div className="">
      <AnimateChangeInHeight className="">
        <button
          onClick={() => {
            setTriesLeft((previous) => previous - 1)
            setShowFeedback(true)
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
                <div>{aiFeedback.feedbackStart}</div>
                <div className="flex flex-col gap-3">
                  {aiFeedback.feedback.map((entry, index) => (
                    <div key={index}>
                      <div className="flex flex-row items-center gap-1 ">
                        <FaIcon
                          icon={faTriangleExclamation}
                          className="text-purple-400"
                        />
                        <a
                          href="#feedback-criteria"
                          className="text-brand-700"
                        >{`${entry.title}`}</a>
                      </div>
                      <div>
                        {entry.feedback.map((elem, index) => {
                          if (typeof elem === 'object' && 'type' in elem) {
                            return (
                              <a
                                key={index}
                                href={elem.href}
                                className="text-brand-700"
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
