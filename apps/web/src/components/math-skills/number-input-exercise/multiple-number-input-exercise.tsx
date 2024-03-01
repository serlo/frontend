import { useState } from 'react'

import { NumberKeyboard } from './number-keyboard'
import { ExerciseFeedback } from '../feedback/execise-feedback'
import { NewExerciseButton } from '../number-line-exercise/new-exercise-button'
import { arrayOfLength } from '@/helper/array-of-length'
import { cn } from '@/helper/cn'

interface MultipleNumberInputExerciseProps<DATA> {
  generator: () => DATA
  numberOfInputs: number
  getCorrectValues: (input: DATA) => number[]
  render: (inputs: JSX.Element[], data: DATA) => JSX.Element
  widthForDigits?: number
  centAmount?: number
  className?: string
}

// input supports ~ up to 7 digits without clipping

export function MultipleNumberInputExercise<T>({
  generator,
  getCorrectValues,
  render,
  widthForDigits = 7,
  centAmount,
  className,
  numberOfInputs,
}: MultipleNumberInputExerciseProps<T>) {
  const [inputValues, setInputValues] = useState(
    arrayOfLength(numberOfInputs).map(() => '')
  )
  const [isChecked, setIsChecked] = useState(false)
  const [data, setData] = useState(generator())
  const [selected, setSelected] = useState(0)

  const correctValues = getCorrectValues(data)

  const isCorrect = correctValues.every(
    (val, i) => val === parseInt(inputValues[i])
  )

  function makeNewExercise() {
    setData(generator())
    setInputValues(inputValues.map(() => ''))
    setIsChecked(false)
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('#number-input input')?.focus()
    })
  }

  return (
    <>
      <NewExerciseButton makeNewExercise={makeNewExercise} />

      {render(
        inputValues.map((_, i) => (
          <input
            key={i}
            autoFocus={i === 0}
            value={inputValues[i]}
            disabled={isChecked}
            onChange={({ currentTarget }) => {
              const newValues = [...inputValues]
              newValues[i] = currentTarget.value
              setInputValues(newValues)
              setSelected(i)
            }}
            onFocus={() => {
              setSelected(i)
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
          />
        )),
        data
      )}

      <ExerciseFeedback
        noUserInput={inputValues.every((x) => x.trim() === '')}
        noUserInputText={<>Gib eine Zahl ein</>}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        isIncorrectText={<>Leider nicht richtig.</>}
        isCorrect={isCorrect}
        shakeElementId="number-input"
        makeNewExercise={makeNewExercise}
        centAmount={centAmount}
      />

      <NumberKeyboard
        addCharacter={(char: string) => {
          const newValues = [...inputValues]
          newValues[selected] = newValues[selected] + char
          setInputValues(newValues)
        }}
        removeCharacter={() => {
          const newValues = [...inputValues]
          newValues[selected] = newValues[selected].slice(0, -1)
          setInputValues(newValues)
        }}
        isDisabled={isChecked}
      />
    </>
  )
}
