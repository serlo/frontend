import { useEffect, useState } from 'react'

import { ActualRangeInput } from './actual-range-input'
import { ArrowButtonNavigation } from './arrow-button-navigation'
import { NewExerciseButton } from './new-exercise-button'
import { NumberLabels } from './number-labels'
import { RangeInputOverlay } from './range-input-overlay'
import { feedbackAnimation } from '../utils/feedback-animation'
import { useExerciseData } from '../utils/math-skills-data-context'

// layout support up to 6 digits

interface NumberLineExerciseProps {
  generator: () => [number, number, number]
}

export function NumberLineExercise({ generator }: NumberLineExerciseProps) {
  const [selectedValue, setSelectedValue] = useState(-1) // move outside for actual exercise

  const [[searchedValue, labeledPosition, maxValue], setValues] = useState([
    0, 0.0, 0,
  ])
  const labeledValue = labeledPosition * maxValue

  const [isChecked, setIsChecked] = useState(false)
  const { setExerciseData } = useExerciseData()

  const isCorrect = selectedValue === searchedValue

  const onCheck = () => {
    if (isChecked || selectedValue === 0) return
    feedbackAnimation(isCorrect, document.getElementById('number-line-wrapper'))
    setIsChecked(true)
    setExerciseData(isCorrect)
  }

  function makeNewExercise() {
    setValues(generator())
    setSelectedValue(0)
    setIsChecked(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>
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
    </>
  )
}
