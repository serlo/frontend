import { useEffect, useState } from 'react'

import { ActualRangeInput } from './actual-range-input'
import { ArrowButtonNavigation } from './arrow-button-navigation'
import { NewExerciseButton } from './new-exercise-button'
import { NumberLabels } from './number-labels'
import { RangeInputOverlay } from './range-input-overlay'
import { feedbackAnimation } from '../utils/feedback-animation'
import { getIntRange } from '@/helper/get-int-range'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// layout support up to 6 digits

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
    feedbackAnimation(isCorrect, document.getElementById('number-line-wrapper'))
    setIsChecked(true)
  }

  function makeNewExercise() {
    const kind = randomItemFromArray([0, 1])
    if (kind === 0) {
      const maxVal = 40

      const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
      const searchValues = getIntRange(10, 39, [labeledPos * 40])
      const searchedVal = randomItemFromArray(searchValues)
      setValues([searchedVal, labeledPos, maxVal])
    } else {
      const maxVal = randomItemFromArray([8000, 12000, 16000, 20000])
      const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
      const possibleSearchValues = [
        maxVal / 4,
        maxVal / 2,
        (maxVal / 4) * 3,
        maxVal,
      ].filter((val) => val !== maxVal * labeledPos)
      const searchedVal = randomItemFromArray(possibleSearchValues)
      setValues([searchedVal, labeledPos, maxVal])
    }
    setSelectedValue(0)
    setIsChecked(false)
  }

  useEffect(makeNewExercise, [])

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') isChecked ? makeNewExercise() : onCheck()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        document.getElementById('number-line-input')?.focus()
      }
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, searchedValue, isChecked])

  return (
    <div className="relative mx-4 my-16 max-w-lg bg-white">
      <h2 className="pb-8 text-left text-2xl font-bold">
        Wo ist die <span className="text-newgreen">{searchedValue}</span>?
      </h2>

      <NewExerciseButton makeNewExercise={makeNewExercise} />

      <div className="relative" id="number-line-wrapper">
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
        <div className="mt-6 text-center text-gray-500 sm:mt-0 sm:text-right">
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
