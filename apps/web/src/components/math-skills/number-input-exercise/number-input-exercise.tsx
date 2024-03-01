import { useState } from 'react'

import { NumberKeyboard } from './number-keyboard'
import { ExerciseFeedback } from '../feedback/execise-feedback'
import { NewExerciseButton } from '../number-line-exercise/new-exercise-button'
import { cn } from '@/helper/cn'

interface NumberInputExerciseProps<DATA> {
  generator: () => DATA
  getCorrectValue: (input: DATA) => number
  render: (input: JSX.Element, data: DATA) => JSX.Element
  widthForDigits?: number
  centAmount?: number
  className?: string
}

// input supports ~ up to 7 digits without clipping

export function NumberInputExercise<T>({
  generator,
  getCorrectValue,
  render,
  widthForDigits = 7,
  centAmount,
  className,
}: NumberInputExerciseProps<T>) {
  const [inputValue, setInputValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [data, setData] = useState(generator())

  const correctValue = getCorrectValue(data)

  const isCorrect =
    correctValue === parseInt(inputValue) &&
    parseInt(inputValue).toString() === inputValue

  function makeNewExercise() {
    setData(generator())
    setInputValue('')
    setIsChecked(false)
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('#number-input input')?.focus()
    })
  }

  return (
    <>
      <NewExerciseButton makeNewExercise={makeNewExercise} />

      {render(
        <input
          autoFocus
          value={inputValue}
          disabled={isChecked}
          onChange={({ currentTarget }) => {
            setInputValue(currentTarget.value)
          }}
          type="text"
          pattern="\d+"
          inputMode="decimal"
          autoComplete="off"
          className={cn(
            'ml-0.5 rounded-lg bg-[#d8f5ef] p-2 text-2xl ',
            'outline-dotted outline-2 outline-transparent focus-visible:outline-newgreen',
            isChecked && isCorrect && 'bg-newgreen-600',
            isChecked && !isCorrect && 'bg-red-100',
            className
          )}
          style={{ width: `${widthForDigits * 0.7}em` }}
        />,
        data
      )}

      <ExerciseFeedback
        noUserInput={inputValue.trim() === ''}
        noUserInputText={<>Gib eine Zahl ein</>}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        isIncorrectText={
          <>
            Leider nicht richtig.
            <br />
            Die richtige Antwort wäre <b>{correctValue}</b> gewesen.
          </>
        }
        isCorrect={isCorrect}
        shakeElementId="number-input"
        makeNewExercise={makeNewExercise}
        centAmount={centAmount}
      />

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
