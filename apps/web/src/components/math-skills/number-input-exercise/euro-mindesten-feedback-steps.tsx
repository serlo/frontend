import * as confetti from 'canvas-confetti'
import { Dispatch, SetStateAction, useState } from 'react'

import { ExStatus } from '../feedback/execise-feedback'
import { animalsData } from '../utils/animal-data'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
import { arrayOfLength } from '@/helper/array-of-length'
import { cn } from '@/helper/cn'

type Coin = 50 | 20 | 10 | 5 | 2 | 1

const correctStrings = [
  'Genau!',
  'Super.',
  'Richtig!',
  'Genau so!',
  'Top 👌',
  'Läuft bei dir.',
]

export function EuroMindestensFeedbackSteps({
  data,
  setExStatus,
}: {
  data: {
    cent: number
    n: number
    coins: number[]
  }
  setExStatus: Dispatch<SetStateAction<ExStatus>>
}) {
  const { n: correctValue, coins, cent } = data
  const [feedback, setFeedback] = useState<{
    element: JSX.Element | null | string
    isCorrect?: boolean
  }>({ element: null })
  const [step, setStep] = useState(0)
  const { name, animal } = useMathSkillsStorage().data

  const alreadyPaid = arrayOfLength(step).map((_, index) => coins[index])
  const alreadyPaidSum = alreadyPaid.reduce((sum, value) => sum + value, 0)

  return (
    <div>
      <div className="mx-side py-6">
        <b>✌️ Schritt für Schritt</b>
        <h2 className="mr-12 mt-2 pb-5 text-2xl text-almost-black">
          Der gesamte Betrag ist <b className="text-newgreen">{cent} Cent</b>.
        </h2>
        {step === 0 ? (
          <div className="text-lg">
            Welche Münze hat einen Wert, <b>der möglichst groß</b> ist, aber
            kleiner als der <b>gesamte Betrag</b>{' '}
            <span className="inline-block">({cent} Cent) ?</span>
          </div>
        ) : null}
        {step > 0 && step <= coins.length ? (
          <>
            <h2 className="mr-12 pb-5 text-2xl text-almost-black">
              <b>{correctStrings[step]}</b> <br /> Und wenn du diesen Wert
              abziehst bleiben noch:{' '}
              <span className="inline-block">
                {cent} Cent{' '}
                {alreadyPaid.map((value, index) => {
                  return (
                    <span
                      key={value}
                      className={cn(index === step - 1 && 'font-bold')}
                    >
                      {' '}
                      - {renderCoin(value as Coin, true)}
                    </span>
                  )
                })}{' '}
                ={' '}
                <b className="inline-block text-newgreen">
                  {cent - alreadyPaidSum} Cent
                </b>
              </span>
            </h2>
          </>
        ) : null}
        {step < coins.length ? (
          <>
            {step > 0 ? (
              <div className="text-lg">
                Und dann machen wir genau so weiter:
                <br /> Welche Münze hat jetzt einen Wert, der{' '}
                <b>möglichst groß ist</b>, die kleiner ist als der{' '}
                <b>verbleibende Betrag</b> (
                <span className="inline-block">
                  {cent - alreadyPaidSum} Cent) ?
                </span>
                <br />
                <br />
                {coins[step] === coins[step - 1] ? (
                  <i>Denk dran, dass Münzen auch mehrmals auswählen kannst</i>
                ) : null}
              </div>
            ) : null}
            <div className="my-4 flex items-center">
              {renderCoin(50)}
              {renderCoin(20)}
              {renderCoin(10)}
              {renderCoin(5)}
              {renderCoin(2)}
              {renderCoin(1)}
            </div>
            {renderFeedback()}
          </>
        ) : (
          <>
            <h2 className="mr-12 pb-5 text-2xl text-almost-black">
              <b>
                Weil du immer die wertvollste Münze gewählt hast, kannst du so
                mit möglichst wenigen Münzen zahlen.
              </b>
              <br />
              <br />
              Wie viele Münzen hat es diesmal gebaucht?
            </h2>
            <div className="my-4 flex items-center">
              {arrayOfLength(correctValue + 1).map((_, index) => {
                return renderAnswerOption(correctValue + 1 - index)
              })}
            </div>
            {renderFeedback()}
          </>
        )}
      </div>
    </div>
  )

  function renderFeedback() {
    return (
      <div className="text-lg">
        {feedback.element ? (
          <span
            className={cn(
              'inline-block',
              feedback.isCorrect ? 'animate-jump' : 'animate-shake'
            )}
          >
            {animalsData[animal].emoji} <i>{feedback.element}</i>
          </span>
        ) : (
          <>&nbsp;</>
        )}
      </div>
    )
  }

  function renderCoin(centValue: Coin, inactive?: boolean) {
    const extraClasses = {
      50: 'bg-yellow-200 w-12 text-2xl outline-yellow-100',
      20: 'bg-yellow-200 w-11 text-xl outline-yellow-100',
      10: 'bg-yellow-200 w-9 text-[1.2rem] outline-yellow-100',
      5: 'bg-amber-500 w-[2.15rem] text-2xl outline-amber-400',
      2: 'bg-amber-500 w-9 text-2xl outline-amber-400',
      1: 'bg-amber-500 w-8 text-[1.2rem] outline-amber-400',
    }

    return (
      <button
        className={cn(
          'inline-flex aspect-square items-center justify-around rounded-full text-center font-bold',
          'outline outline-[3px] hover:opacity-80',
          inactive ? 'bg-opacity-50' : 'mr-3',
          extraClasses[centValue]
        )}
        disabled={inactive}
        onClick={() => {
          setFeedback({ element: null })
          if (centValue === coins[step]) {
            setStep(step + 1)
          }
          if (centValue > coins[step]) {
            setTimeout(() => {
              setFeedback({
                element: `${centValue} Cent wäre mehr als du bezahlen musst. Suche eine weniger wertvolle Münze aus.`,
              })
            })
          }
          setTimeout(() => {
            if (centValue < coins[step]) {
              setFeedback({
                element: 'Es gibt noch eine höhere Münze die passt.',
              })
            }
          })
        }}
      >
        {centValue}
      </button>
    )
  }
  function renderAnswerOption(amount: number) {
    return (
      <button
        className={cn(
          'mr-3 inline-flex aspect-square items-center justify-around rounded-lg text-center font-bold',
          'outline-animal w-12 bg-gray-200 outline outline-[3px] hover:opacity-80'
        )}
        onClick={() => {
          setFeedback({ element: null })
          setTimeout(() => {
            if (amount === correctValue) {
              setFeedback({
                element: (
                  <>
                    Super {name ?? ''}! Du hat die Aufgabe gelöst. <br />
                    <span className="!font-bold !not-italic">
                      {' '}
                      Trag dein Ergebnis oben ein und zeig direkt bei der
                      nächsten Aufgabe was du gelernt hast!
                    </span>
                  </>
                ),
                isCorrect: true,
              })
              setExStatus('fresh')
              void confetti.default()
            }
            if (amount < correctValue) {
              setFeedback({
                element: "So wenige? Zähl' oben in der Rechnung noch mal nach.",
              })
            }
            if (amount > correctValue) {
              setFeedback({
                element: "So viele? Zähl' oben in der Rechnung noch mal nach.",
              })
            }
          })
        }}
      >
        {amount}
      </button>
    )
  }
}
