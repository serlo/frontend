import { useEffect, useState } from 'react'

import { NewExerciseButton } from '../number-line-exercise/new-exercise-button'
import { feedbackAnimation } from '../utils/feedback-animation'
import { useExerciseData } from '../utils/math-skills-data-context'
import { cn } from '@/helper/cn'

interface PlaceValueChooserProps {
  generator: () => { figure: number; searchedDigit: number }
  centAmount?: number
}

export function PlaceValueChooser({
  generator,
  centAmount,
}: PlaceValueChooserProps) {
  const [data, setData] = useState(generator())
  const [isChecked, setIsChecked] = useState(false)
  const { setExerciseData } = useExerciseData()
  const { figure, searchedDigit } = data
  const figureString = String(figure)
  const digitAmount = figureString.length
  const [selectedDigit, setSelectedDigit] = useState<number | undefined>(
    undefined
  )
  const isCorrect = selectedDigit === searchedDigit

  function makeNewExercise() {
    setData(generator())
    setSelectedDigit(undefined)
    setIsChecked(false)
    setTimeout(() => {
      document.getElementById('place-value-chooser-input')?.focus()
    })
  }

  function onCheck() {
    if (selectedDigit === undefined) return
    feedbackAnimation(
      isCorrect,
      document.getElementById('place-value-chooser-wrapper')
    )
    setIsChecked(true)
    setExerciseData(isCorrect, centAmount)
  }

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') isChecked ? makeNewExercise() : onCheck()
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, figure, selectedDigit])

  return (
    <>
      <h2 className="pb-8 text-left text-2xl font-bold">
        Markiere den Stellenwert:{' '}
        <span className="text-newgreen">{getDigitString()?.long}</span>
      </h2>

      <NewExerciseButton makeNewExercise={makeNewExercise} />

      <div
        id="place-value-chooser-wrapper"
        className="flex justify-center text-2xl font-bold"
      >
        {[...figureString].map((char, i) => {
          const digitIndex = digitAmount - i
          const isTicked = digitIndex === selectedDigit
          return (
            <label key={char + i}>
              <input
                id="place-value-chooser-input"
                className="appearance-none opacity-0"
                type="radio"
                disabled={isChecked}
                name={figureString}
                value={char}
                checked={isTicked}
                onChange={() => setSelectedDigit(digitIndex)}
              />
              <span
                className={cn(
                  'mx-0.25 inline-block min-w-[30px] rounded-md border-2 p-1.5 text-center',
                  // default selection
                  isTicked &&
                    !isChecked &&
                    'border-newgreen-600 bg-newgreen bg-opacity-10',
                  // feedback
                  isChecked &&
                    isTicked &&
                    isCorrect &&
                    'border-newgreen-600 bg-newgreen bg-opacity-50',
                  isChecked &&
                    isTicked &&
                    !isCorrect &&
                    'border-red-300 bg-red-100',
                  // feedback: actually correct:
                  isChecked &&
                    !isCorrect &&
                    searchedDigit === digitIndex &&
                    'border-newgreen-600 bg-newgreen bg-opacity-20'
                )}
              >
                {char}
              </span>
            </label>
          )
        })}
      </div>

      <div className="mt-5 min-h-[120px] sm:flex sm:min-h-[80px] sm:items-center sm:justify-between">
        <div className="text-almost-black">
          {isChecked ? (
            <p>
              {isCorrect ? 'Sehr gut gemacht 👌' : <>Leider nicht richtig.</>}
            </p>
          ) : null}
        </div>
        <div className="pt-5 sm:flex sm:justify-between sm:pt-0">
          {selectedDigit === undefined ? (
            <>Wähle eine Stelle aus</>
          ) : (
            <button
              className="serlo-button-blue -mt-1 h-8 focus:bg-brand"
              onClick={isChecked ? makeNewExercise : onCheck}
            >
              {isChecked ? 'Nächste Aufgabe' : 'Überprüfen'}
            </button>
          )}
        </div>
      </div>
    </>
  )

  function getDigitString() {
    if (searchedDigit < 1 || searchedDigit > 7) return undefined
    return digitStrings[searchedDigit as keyof typeof digitStrings]
  }
}

const digitStrings = {
  1: { long: 'Einer', short: 'E' },
  2: { long: 'Zehner', short: 'Z' },
  3: { long: 'Hunderter', short: 'H' },
  4: { long: 'Tausender', short: 'T' },
  5: { long: 'Zehntausender', short: 'Z' },
  6: { long: 'Hunderttausender', short: 'H' },
  7: { long: 'Million', short: 'M' },
}
