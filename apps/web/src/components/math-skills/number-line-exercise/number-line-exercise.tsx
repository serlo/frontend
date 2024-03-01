import { useEffect, useState } from 'react'

import { ActualRangeInput } from './actual-range-input'
import { ArrowButtonNavigation } from './arrow-button-navigation'
import { NumberLabels } from './number-labels'
import { RangeInputOverlay } from './range-input-overlay'
import { ExerciseFeedback } from '../exercises/components/feedback/execise-feedback'
import { NewExerciseButton } from '../exercises/components/new-exercise-button'

// layout support up to 6 digits

interface NumberLineExerciseProps {
  generator: () => [number, number, number]
  centAmount?: number
}

export function NumberLineExercise({
  generator,
  centAmount,
}: NumberLineExerciseProps) {
  const [selectedValue, setSelectedValue] = useState(-1) // move outside for actual exercise

  const [[searchedValue, labeledPosition, maxValue], setValues] = useState([
    0, 0.0, 0,
  ])
  const labeledValue = labeledPosition * maxValue
  const startValue = Math.round(maxValue / 8)

  const [isChecked, setIsChecked] = useState(false)

  const isCorrect = selectedValue === searchedValue

  function makeNewExercise() {
    const newData = generator()
    const newMaxValue = newData[2]
    setValues(newData)
    setSelectedValue(Math.round(newMaxValue / 8))
    setIsChecked(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(makeNewExercise, [])

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        document.getElementById('number-line-input')?.focus()
      }
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, searchedValue, isChecked])

  const noInputText = (
    <>
      Klicke auf den Zeitstrahl
      <br /> oder benutze die Pfeilbuttons
    </>
  )
  const isIncorrectText = (
    <>
      Leider nicht richtig.
      <br />
      Du hast die Zahl <b>{selectedValue}</b> ausgewählt.
    </>
  )

  return (
    <>
      <h2 className="pb-5 text-left text-2xl text-almost-black">
        Wo ist die{' '}
        <span className="font-bold text-newgreen">{searchedValue}</span>?
      </h2>
      <NewExerciseButton makeNewExercise={makeNewExercise} />
      <div className="relative touch-pinch-zoom" id="number-line-wrapper">
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

      <div className="-mt-8 mb-4">
        <ExerciseFeedback
          noUserInput={selectedValue === startValue}
          noUserInputText={noInputText}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          isIncorrectText={isIncorrectText}
          isCorrect={isCorrect}
          elementToShakeQuery="#range-input-user-maker"
          makeNewExercise={makeNewExercise}
          centAmount={centAmount}
        />
      </div>

      <ArrowButtonNavigation
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        maxValue={maxValue}
      />
    </>
  )
}
