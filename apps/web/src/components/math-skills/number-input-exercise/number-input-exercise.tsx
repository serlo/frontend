import { useState } from 'react'

import { ExStatus, ExerciseFeedback } from '../feedback/execise-feedback'
import { cn } from '@/helper/cn'

interface NumberInputExerciseProps<DATA> {
  generator: () => DATA
  getCorrectValue?: (input: DATA) => number
  getCorrectStringValue?: (input: DATA) => string
  render: (input: JSX.Element, data: DATA) => JSX.Element
  widthForDigits?: number
  centAmount?: number
  className?: string
}

// input supports ~ up to 7 digits without clipping

export function NumberInputExercise<T>({
  generator,
  getCorrectValue,
  getCorrectStringValue,
  render,
  widthForDigits = 7,
  centAmount,
  className,
}: NumberInputExerciseProps<T>) {
  const [inputValue, setInputValue] = useState('')
  const [exStatus, setExStatus] = useState<ExStatus>('fresh')
  const [data, setData] = useState(generator())

  const correctValue = getCorrectValue
    ? getCorrectValue(data)
    : getCorrectStringValue
      ? getCorrectStringValue(data)
      : '?'

  const isCorrect = getCorrectValue
    ? correctValue === parseInt(inputValue) &&
      parseInt(inputValue).toString() === inputValue
    : correctValue.toString().toLowerCase().replace(/\s/g, '') ===
      correctValue.toString().toLowerCase()

  return (
    <>
      {render(
        <input
          autoFocus
          value={inputValue}
          disabled={exStatus === 'correct' || exStatus === 'revealed'}
          onChange={({ currentTarget }) => {
            setInputValue(currentTarget.value)
            if (exStatus === 'incorrect') {
              setExStatus('fresh')
            }
          }}
          onFocus={() => {
            if (exStatus === 'incorrect') {
              setExStatus('fresh')
            }
          }}
          type="text"
          pattern="\d+"
          inputMode={getCorrectValue ? 'decimal' : 'text'}
          autoComplete="off"
          className={cn(
            `ml-0.5 rounded-lg bg-[#d8f5ef] p-2 text-2xl font-bold
            outline-dotted outline-2 outline-transparent focus-visible:outline-newgreen`,
            exStatus === 'correct' && 'bg-newgreen-600',
            (exStatus === 'incorrect' || exStatus === 'revealed') &&
              'bg-red-100',
            className
          )}
          style={{ width: `${widthForDigits * 0.7}em` }}
        />,
        data
      )}

      <ExerciseFeedback
        noUserInput={inputValue.trim() === ''}
        noUserInputText={<>Gib eine Zahl ein</>}
        exStatus={exStatus}
        setExStatus={setExStatus}
        feedbacks={{
          revealed: (
            <>
              Die richtige Antwort wäre{' '}
              <b className="text-newgreen">{correctValue}</b> gewesen.
            </>
          ),
        }}
        isCorrect={isCorrect}
        shakeElementQuery="#number-input"
        focusElementQuery="#number-input input"
        onNewExecise={() => {
          setData(generator())
          setInputValue('')
        }}
        centAmount={centAmount}
      />
    </>
  )
}
