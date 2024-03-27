import { useState } from 'react'

import { EuroMindestensFeedbackSteps } from './euro-mindesten-feedback-steps'
import { ExStatus, ExerciseFeedback } from '../feedback/execise-feedback'
import { cn } from '@/helper/cn'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

function generator() {
  const precalc = {
    1: [20, 50],
    2: [11, 12, 15, 21, 22, 25, 30, 40, 51, 52, 55, 60, 70],
    3: [
      13, 14, 16, 17, 23, 24, 26, 27, 31, 32, 35, 41, 42, 45, 53, 54, 56, 57,
      61, 62, 65, 71, 72, 75, 80, 90,
    ],
    4: [
      18, 19, 28, 29, 33, 34, 36, 37, 43, 44, 46, 47, 58, 59, 63, 64, 66, 67,
      73, 74, 76, 77, 81, 82, 85, 91, 92, 95,
    ],
    5: [38, 39, 48, 49, 68, 69, 78, 79, 83, 84, 86, 87, 93, 94, 96, 97],
    6: [88, 89, 98, 99],
  } as { [key: number]: number[] }
  const n = randomIntBetween(1, 4)
  const cent = randomItemFromArray(precalc[n])

  const coins = []

  const coinsAvailable = [50, 20, 10, 5, 2, 1]
  let remainingCents = cent
  while (remainingCents !== 0) {
    const biggestCoin = coinsAvailable.find(
      (coinCents) => remainingCents >= coinCents
    )!
    coins.push(biggestCoin)
    remainingCents -= biggestCoin
  }

  return { cent, n, coins }
}

export function EuroMindestensFeedback() {
  const [inputValue, setInputValue] = useState('')
  const [exStatus, setExStatus] = useState<ExStatus>('fresh')
  const [data, setData] = useState(generator())

  const { n: correctValue, cent } = data

  const isCorrect =
    correctValue === parseInt(inputValue) &&
    parseInt(inputValue).toString() === inputValue

  return (
    <>
      <h2 className="mr-12 pb-5 text-2xl text-almost-black">
        Du willst <b className="text-newgreen">{cent} Cent</b> bezahlen.
        <br />
        Wie viele Münzen brauchst du mindestens?
      </h2>
      <div className="text-2xl font-bold text-almost-black" id="number-input">
        <label>{renderInput()} Münzen</label>
      </div>

      <ExerciseFeedback
        noUserInput={inputValue.trim() === ''}
        noUserInputText={<>Gib eine Zahl ein</>}
        exStatus={exStatus}
        setExStatus={setExStatus}
        feedbacks={{
          revealed: <></>,
          incorrect: (
            <>
              Das stimmt so noch nicht.
              <br />
              <b>Probier&apos;s einfach noch mal,</b>
              <br />
              oder{' '}
              <a
                className="serlo-link cursor-pointer"
                onClick={() => {
                  ;(
                    document.getElementById(
                      'hint-details'
                    ) as HTMLDetailsElement
                  ).open = true
                }}
              >
                schau&apos; dir die Tipps an
              </a>
              , oder{' '}
              <a
                className="serlo-link cursor-pointer"
                onClick={() => {
                  setExStatus('revealed')
                }}
              >
                mach die Aufgabe Schritt für Schritt.
              </a>
              .
            </>
          ),
        }}
        isCorrect={isCorrect}
        shakeElementQuery="#number-input"
        focusElementQuery="#number-input input"
        onNewExecise={() => {
          setData(generator())
          setInputValue('')
          ;(
            document.getElementById('hint-details') as HTMLDetailsElement
          ).open = false
        }}
        centAmount={35}
      />

      <div className="my-3 w-full rounded-xl bg-gray-50 p-3 pt-5">
        <h4 className="block text-center font-bold">
          Diese Cent-Münzen gibt es:
        </h4>
        <div className="my-2 flex items-center justify-center">
          {renderCoin(50)}
          {renderCoin(20)}
          {renderCoin(10)}
          {renderCoin(5)}
          {renderCoin(2)}
          {renderCoin(1)}
        </div>
      </div>

      {renderHint()}
    </>
  )

  function renderCoin(number: 50 | 20 | 10 | 5 | 2 | 1) {
    const extraClasses = {
      50: 'bg-yellow-200 w-12 text-2xl outline-yellow-100',
      20: 'bg-yellow-200 w-11 text-xl outline-yellow-100',
      10: 'bg-yellow-200 w-9 text-[1.2rem] outline-yellow-100',
      5: 'bg-amber-500 w-[2.15rem] text-2xl outline-amber-400',
      2: 'bg-amber-500 w-9 text-2xl outline-amber-400',
      1: 'bg-amber-500 w-8 text-[1.2rem] outline-amber-400',
    }

    return (
      <span
        className={cn(
          'mr-3 inline-flex aspect-square items-center justify-around rounded-full text-center font-bold',
          'outline outline-[3px]',
          extraClasses[number]
        )}
      >
        {number}
      </span>
    )
  }

  function renderHint() {
    return (
      <details
        className="group grow"
        id="hint-details"
        open={exStatus === 'revealed'}
      >
        <summary className="serlo-button-light px-2.5 py-1.5">
          <h4>
            Tipps anzeigen{' '}
            <span className="inline-block group-open:translate-y-0.5 group-open:rotate-180">
              ▾
            </span>
          </h4>
        </summary>
        <div className="mt-3 w-full rounded-xl bg-gray-50 p-3">
          {exStatus === 'revealed' ? (
            <EuroMindestensFeedbackSteps
              data={data}
              setExStatus={setExStatus}
            />
          ) : (
            <div>
              <ul className="serlo-ul">
                <li>Du kannst alle Münzen auch mehrmals verwenden.</li>
                <li>
                  Euro-Münzen brauchst du nicht, weil der Betrag kleiner als 100
                  Cent ist.
                </li>
              </ul>
              <p className="mt-3">
                <button
                  className="hover:bg-opacity-35 serlo-button-light bg-animal bg-opacity-30 px-2.5 py-1.5 text-almost-black hover:text-black"
                  onClick={() => setExStatus('revealed')}
                >
                  Schritt für Schritt rechnen
                </button>
              </p>
            </div>
          )}
        </div>
      </details>
    )
  }

  function renderInput() {
    return (
      <input
        value={inputValue}
        disabled={exStatus === 'correct' || exStatus === 'revealed'}
        onChange={({ currentTarget }) => {
          setInputValue(currentTarget.value)
          if (exStatus === 'incorrect') {
            setExStatus('fresh')
          }
        }}
        onFocus={() => {
          if (exStatus === 'incorrect') {
            setExStatus('fresh')
          }
        }}
        type="text"
        pattern="\d+"
        inputMode="decimal"
        autoComplete="off"
        className={cn(
          `ml-0.5 rounded-lg bg-[#d8f5ef] p-2 text-center text-2xl font-bold
            outline-dotted outline-2 outline-transparent focus-visible:outline-newgreen`,
          exStatus === 'correct' && 'bg-newgreen-600',
          (exStatus === 'incorrect' || exStatus === 'revealed') && 'bg-red-100'
        )}
        style={{ width: `${3 * 0.7}em` }}
      />
    )
  }
}
