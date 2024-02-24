import * as confetti from 'canvas-confetti' // why is this throwing warnings? sigh ..
import { useEffect, useState } from 'react'

import { ActualRangeInput } from './actual-range-input'
import { ArrowButtonNavigation } from './arrow-button-navigation'
import { NewExerciseButton } from './new-exercise-button'
import { NumberLabels } from './number-labels'
import { RangeInputOverlay } from './range-input-overlay'
import { shuffleArray } from '@/helper/shuffle-array'

// layout support up to 6 digits

const exampleValues = [
  // searchedValue, labeledPos, maxValue
  [9000, 0.5, 12000],
  [3000, 0.75, 12000],
  [12000, 0.25, 12000],
  [9000, 0.25, 12000],
  [3000, 0.5, 12000],
  [6000, 0.5, 12000],
  [6000, 1, 8000],
  [2000, 1, 8000],
  [4000, 1, 8000],
  [8000, 0.5, 8000],
  [2000, 0.25, 8000],
  [6000, 0.75, 8000],
]

function helperChooseRandomly<T>(arr: T[]) {
  return shuffleArray(arr)[0]
}

export function NumberLineExercise() {
  const [selectedValue, setSelectedValue] = useState(-1) // move outside for actual exercise

  const [[searchedValue, labeledPosition, maxValue], setValues] = useState([
    0, 0.0, 0,
  ])
  const labeledValue = labeledPosition * maxValue

  const [isChecked, setIsChecked] = useState(false)

  const isCorrect = selectedValue === searchedValue

  const onCheck = () => {
    if (isChecked || selectedValue === 0) return

    if (isCorrect) {
      void confetti.default()
    } else {
      const element = document.getElementById('number-line')?.parentElement
      element?.classList.add('animate-shake')
      setTimeout(() => {
        element?.classList.remove('animate-shake')
      }, 1000)
    }
    setIsChecked(true)
  }

  function makeNewExercise() {
    const kind = helperChooseRandomly([0, 1, 2, 3])
    if (kind === 0 || kind === 1) {
      // basic, maxVal fixed to 40 or 400, exact choice
      const step = kind === 1 ? 10 : 1
      const maxVal = step * 40
      const searchValues = []
      for (let i = 10; i < 40; i++) {
        if (i !== 20) {
          searchValues.push(i)
        }
      }
      const searchedVal = helperChooseRandomly(searchValues) * step
      const labeledPos = helperChooseRandomly([0.25, 0.5, 0.75, 1])
      setValues([searchedVal, labeledPos, maxVal])
    } else {
      setValues(helperChooseRandomly(exampleValues) as [number, number, number])
    }
    setSelectedValue(0)
    setIsChecked(false)
  }

  useEffect(makeNewExercise, [])

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') isChecked ? makeNewExercise() : onCheck()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        document.getElementById('number-line')?.focus()
      }
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, searchedValue, isChecked])

  return (
    <div className="relative mx-4 my-16 max-w-lg bg-white">
      <h2 className="mx-4 block pb-8 text-left text-2xl font-bold">
        Wo ist die <span className="text-newgreen">{searchedValue}</span>?
      </h2>

      <NewExerciseButton makeNewExercise={makeNewExercise} />

      <div className="relative">
        <ActualRangeInput
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          maxValue={maxValue}
          searchedValue={searchedValue}
          disabled={isChecked}
        />
        <NumberLabels
          maxValue={maxValue}
          labeledValue={labeledValue}
          isChecked={isChecked}
        />
        <div className="pointer-events-none absolute top-6 w-full px-4">
          <RangeInputOverlay
            maxValue={maxValue}
            selectedValue={selectedValue}
            searchedValue={searchedValue}
            isChecked={isChecked}
            isCorrect={isCorrect}
          />
        </div>
      </div>

      <div className="h-3 justify-between text-center sm:flex sm:text-left">
        {isChecked ? (
          <p>
            {isCorrect ? (
              'Sehr gut gemacht 👌'
            ) : (
              <>
                Leider nicht richtig.
                <br />
                Du hast die Zahl <b>{selectedValue}</b> ausgewählt.
              </>
            )}
          </p>
        ) : (
          <ArrowButtonNavigation
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            maxValue={maxValue}
          />
        )}
        <div className="mt-6 text-center text-gray-500 sm:text-right">
          {selectedValue === 0 ? (
            <>
              Klicke auf den Zeitstrahl
              <br /> oder benutze die Pfeilbuttons
            </>
          ) : (
            <button
              className="serlo-button-blue mt-2 h-8"
              onClick={isChecked ? makeNewExercise : onCheck}
            >
              {isChecked ? 'Nächste Aufgabe' : 'Überprüfen'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
