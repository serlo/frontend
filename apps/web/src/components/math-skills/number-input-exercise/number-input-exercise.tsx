import { useEffect, useState } from 'react'

import { NumberKeyboard } from './number-keyboard'
import { NewExerciseButton } from '../number-line-exercise/new-exercise-button'
import { feedbackAnimation } from '../utils/feedback-animation'
import { useExerciseData } from '../utils/math-skills-data-context'
import { cn } from '@/helper/cn'

interface NumberInputExerciseProps<DATA> {
  generator: () => DATA
  getCorrectValue: (input: DATA) => number
  render: (input: JSX.Element, data: DATA) => JSX.Element
  centAmount?: number
  longerInput?: boolean
}

// input supports ~ up to 7 digits without clipping

export function NumberInputExercise<T>({
  generator,
  getCorrectValue,
  render,
  centAmount,
  longerInput,
}: NumberInputExerciseProps<T>) {
  const [inputValue, setInputValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [data, setData] = useState(generator())
  const { setExerciseData } = useExerciseData()

  const correctValue = getCorrectValue(data)

  const isCorrect = correctValue === parseInt(inputValue)

  function onCheck() {
    if (!inputValue) return
    feedbackAnimation(isCorrect, document.getElementById('number-input'))
    setIsChecked(true)
    setExerciseData(isCorrect, centAmount)
  }

  function makeNewExercise() {
    setData(generator())
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
      <NewExerciseButton makeNewExercise={makeNewExercise} />

      {render(
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
            'ml-0.5 rounded-lg bg-[#d8f5ef] p-2 text-2xl ',
            'outline-dotted outline-2 outline-transparent focus-visible:outline-newgreen',
            isChecked && isCorrect && 'bg-newgreen-600',
            isChecked && !isCorrect && 'bg-red-100',
            longerInput ? 'w-56' : 'w-[7.8rem]'
          )}
        />,
        data
      )}

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
