import { useState } from 'react'

import { ExStatus, ExerciseFeedback } from '../feedback/execise-feedback'
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
  const [exStatus, setExStatus] = useState<ExStatus>('fresh')
  const [data, setData] = useState(generator())

  const correctValues = getCorrectValues(data)
  const isCorrectArray = correctValues.map(
    (value, i) =>
      (isNaN(value) && !inputValues[i]) ||
      (value === parseInt(inputValues[i]) &&
        parseInt(inputValues[i]).toString() === inputValues[i])
  )
  const isCorrect = isCorrectArray.every(Boolean)
  const incorrectAmount =
    !isCorrect && isCorrectArray.filter((value) => !value).length
  const isDisabled = exStatus === 'correct' || exStatus === 'revealed'

  return (
    <>
      {render(
        inputValues.map((_, i) => (
          <input
            key={i}
            id={`number-input-${i}`}
            value={inputValues[i]}
            disabled={isDisabled}
            onChange={({ currentTarget }) => {
              const newValues = [...inputValues]
              newValues[i] = currentTarget.value
              setInputValues(newValues)
              setExStatus('fresh')
            }}
            type="text"
            pattern="\d+"
            inputMode="decimal"
            autoComplete="off"
            className={cn(
              'ml-0.5 rounded-lg bg-[#d8f5ef] p-2 text-2xl ',
              'outline-dotted outline-2 outline-transparent focus-visible:outline-newgreen',
              exStatus === 'correct' && isCorrectArray[i] && 'bg-newgreen-600',
              (exStatus === 'revealed' || exStatus === 'incorrect') &&
                !isCorrectArray[i] &&
                'bg-red-100',
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
        exStatus={exStatus}
        setExStatus={setExStatus}
        feedbacks={{
          incorrect: (
            <>
              {incorrectAmount === 1
                ? 'Ein Feld stimmt'
                : 'Mehrere Felder stimmen'}{' '}
              noch nicht.
            </>
          ),
          revealed: (
            <>
              Die richtigen Zahlen lauten:
              <br />
              {correctValues.slice(0, -1).map((value, i) => (
                <>
                  <b className="text-newgreen">{value}</b>
                  {i === correctValues.length - 2 ? '' : ','}{' '}
                </>
              ))}{' '}
              und <b className="text-newgreen">{correctValues.at(-1)}</b>.
            </>
          ),
        }}
        isCorrect={isCorrect}
        shakeElementQuery="#number-input"
        focusElementQuery="#number-input-0"
        onNewExecise={() => {
          setData(generator())
          setInputValues(inputValues.map(() => ''))
        }}
        centAmount={centAmount}
      />
    </>
  )
}
