import { useEffect, useState } from 'react'

import { ActualRangeInput } from './actual-range-input'
import { ArrowButtonNavigation } from './arrow-button-navigation'
import { NumberLabels } from './number-labels'
import { RangeInputOverlay } from './range-input-overlay'
import { ExStatus, ExerciseFeedback } from '../feedback/execise-feedback'

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

  const [exStatus, setExStatus] = useState<ExStatus>('fresh')

  const isCorrect = selectedValue === searchedValue
  const isDisabled = exStatus === 'correct' || exStatus === 'revealed'

  function onNewExercise() {
    const newData = generator()
    const newMaxValue = newData[2]
    setValues(newData)
    setSelectedValue(Math.round(newMaxValue / 8))
    setExStatus('fresh')
  }

  useEffect(() => {
    if (exStatus === 'incorrect') setExStatus('fresh')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onNewExercise, [])

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        document.getElementById('number-line-input')?.focus()
      }
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, searchedValue, exStatus])

  const noInputText = <>Bewege den Marker auf dem Zeitstrahl</>

  const isIncorrectText = (
    <>
      Stimmt so leider noch nicht.
      <br />
      Du hast die Zahl <b>{selectedValue}</b> ausgewählt.
      <br />
      Probier es einfach noch mal.
    </>
  )

  return (
    <>
      <h2 className="pb-5 text-left text-2xl text-almost-black">
        Wo ist die{' '}
        <span className="font-bold text-newgreen">{searchedValue}</span>?
      </h2>
      <div className="relative touch-pinch-zoom" id="number-line-wrapper">
        <ActualRangeInput
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          maxValue={maxValue}
          searchedValue={searchedValue}
          disabled={isDisabled}
        />
        <NumberLabels
          maxValue={maxValue}
          labeledValue={labeledValue}
          isChecked={exStatus === 'revealed'}
        />
        <div className="pointer-events-none absolute top-6 w-full px-4">
          <RangeInputOverlay
            maxValue={maxValue}
            selectedValue={selectedValue}
            searchedValue={searchedValue}
            isChecked={exStatus !== 'fresh'}
            isCorrect={isCorrect}
          />
        </div>
      </div>

      <div className="relative -mt-8 mb-4">
        <ExerciseFeedback
          noUserInput={selectedValue === startValue}
          noUserInputText={noInputText}
          exStatus={exStatus}
          setExStatus={setExStatus}
          feedbacks={{ incorrect: isIncorrectText }}
          isCorrect={isCorrect}
          shakeElementQuery="#range-input-user-maker"
          onNewExecise={onNewExercise}
          centAmount={centAmount}
        />
        <div className="absolute left-0 top-[7.4rem] sm:top-[4.7rem]">
          <ArrowButtonNavigation
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            maxValue={maxValue}
            active={!isDisabled}
          />
        </div>
      </div>
    </>
  )
}
