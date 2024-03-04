import { useState } from 'react'

import { ExerciseFeedback } from '../feedback/execise-feedback'
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

  const correctValues = getCorrectValues(data)
  const isCorrectArray = correctValues.map(
    (value, i) =>
      value === parseInt(inputValues[i]) &&
      parseInt(inputValues[i]).toString() === inputValues[i]
  )
  const isCorrect = isCorrectArray.every(Boolean)
  const isPartlyCorrect =
    isCorrectArray.some(Boolean) && isCorrectArray.some((value) => !value)

  return (
    <>
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
            }}
            type="text"
            pattern="\d+"
            inputMode="decimal"
            autoComplete="off"
            className={cn(
              'ml-0.5 rounded-lg bg-[#d8f5ef] p-2 text-2xl ',
              'outline-dotted outline-2 outline-transparent focus-visible:outline-newgreen',
              isChecked && isCorrectArray[i] && 'bg-newgreen-600',
              isChecked && !isCorrectArray[i] && 'bg-red-100',
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
        isIncorrectText={
          isPartlyCorrect ? (
            <>Stimmt leider nicht ganz.</>
          ) : (
            <>Leider nicht richtig.</>
          )
        }
        isCorrect={isCorrect}
        shakeElementQuery="#number-input"
        focusElementQuery="#number-input input"
        onNewExecise={() => {
          setData(generator())
          setInputValues(inputValues.map(() => ''))
        }}
        centAmount={centAmount}
      />
    </>
  )
}
