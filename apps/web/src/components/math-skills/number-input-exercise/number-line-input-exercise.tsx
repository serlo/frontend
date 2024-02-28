import { useEffect, useState } from 'react'

import { NumberKeyboard } from './number-keyboard'
import { ActualRangeInput } from '../number-line-exercise/actual-range-input'
import { NewExerciseButton } from '../number-line-exercise/new-exercise-button'
import { NumberLabels } from '../number-line-exercise/number-labels'
import { RangeInputOverlay } from '../number-line-exercise/range-input-overlay'
import { feedbackAnimation } from '../utils/feedback-animation'
import { useExerciseData } from '../utils/math-skills-data-context'
import { cn } from '@/helper/cn'

interface NumberLineInputExerciseProps {
  generator: () => [number, number, number]
}

// input supports ~ up to 7 digits without clipping

export function NumberLineInputExercise({
  generator,
}: NumberLineInputExerciseProps) {
  const [[searchedValue, labeledPosition, maxValue], setValues] = useState([
    0, 0.0, 0,
  ])
  const [inputValue, setInputValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const { setExerciseData } = useExerciseData()
  const correctValue = searchedValue

  const isCorrect = correctValue === parseInt(inputValue)

  function onCheck() {
    if (!inputValue) return
    feedbackAnimation(isCorrect, document.getElementById('number-input'))
    setIsChecked(true)
    setExerciseData(isCorrect)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(makeNewExercise, [])

  function makeNewExercise() {
    setValues(generator())
    setInputValue('')
    setIsChecked(false)
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('#number-input input')?.focus()
    })
  }

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') isChecked ? makeNewExercise() : onCheck()
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, inputValue])

  return (
    <>
      <div className="relative mb-6 mt-12" id="number-line-wrapper">
        <ActualRangeInput
          selectedValue={searchedValue}
          setSelectedValue={() => {}}
          maxValue={maxValue}
          searchedValue={searchedValue}
          disabled
        />
        <NumberLabels
          maxValue={maxValue}
          labeledValue={labeledPosition * maxValue}
          isChecked={isChecked}
        />
        <div className="pointer-events-none absolute top-6 w-full px-4">
          <RangeInputOverlay
            maxValue={maxValue}
            selectedValue={searchedValue}
            searchedValue={searchedValue}
            isChecked
            isCorrect={false}
          />
        </div>
      </div>
      <NewExerciseButton makeNewExercise={makeNewExercise} />
      <div className="ml-0.5 text-xl font-bold" id="number-input">
        <span>Die gesuchte Zahl lautet:</span>
        <input
          autoFocus
          value={inputValue}
          disabled={isChecked}
          onChange={({ currentTarget }) => setInputValue(currentTarget.value)}
          type="text"
          pattern="\d+"
          inputMode="decimal"
          autoComplete="off"
          className={cn(
            'ml-3 w-[7.8rem] rounded-lg bg-[#d8f5ef] p-2 text-2xl ',
            'outline-dotted outline-2 outline-transparent focus-visible:outline-newgreen',
            isChecked && isCorrect && 'bg-newgreen-600',
            isChecked && !isCorrect && 'bg-red-100'
          )}
        />
      </div>

      <div className="mt-5 min-h-[120px] sm:flex sm:min-h-[80px] sm:items-center sm:justify-between">
        <div className="text-almost-black">
          {isChecked ? (
            <p>
              {isCorrect ? (
                'Sehr gut gemacht 👌'
              ) : (
                <>
                  Leider nicht richtig.
                  <br />
                  Die richtige Antwort wäre <b>{correctValue}</b> gewesen.
                </>
              )}
            </p>
          ) : null}
        </div>
        <div className="pt-5 sm:flex sm:justify-between sm:pt-0">
          {inputValue === '' ? (
            <>Gib eine Zahl ein</>
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

      <NumberKeyboard
        addCharacter={(char: string) => {
          setInputValue(inputValue + char)
        }}
        removeCharacter={() => setInputValue(inputValue.slice(0, -1))}
        isDisabled={isChecked}
      />
    </>
  )
}
