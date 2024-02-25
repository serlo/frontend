import { useEffect, useState } from 'react'

import { NumberKeyboard } from './number-keyboard'
import { NewExerciseButton } from '../number-line-exercise/new-exercise-button'
import { feedbackAnimation } from '../utils/feedback-animation'
import { cn } from '@/helper/cn'
import { randomIntBetween } from '@/helper/random-int-between'

function generator() {
  const base = randomIntBetween(0, 12)
  const powerLimit = Math.floor(base === 10 ? 6 : base > 4 ? 2 : 8 - base * 1.2)
  const power = randomIntBetween(1, powerLimit)
  return { base, power }
}

// input supports ~ up to 7 digits without clipping

export function NumberInputExercise() {
  const [inputValue, setInputValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [{ base, power }, setExponent] = useState({ base: 0, power: 1 })

  const correctValue = Math.pow(base, power)

  const isCorrect = correctValue === parseInt(inputValue)

  function onCheck() {
    if (!inputValue) return
    feedbackAnimation(isCorrect, document.getElementById('number-input'))
    setIsChecked(true)
  }

  function makeNewExercise() {
    setExponent(generator())
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
    <div className="relative mx-4 my-16 max-w-lg bg-white">
      <h2 className="pb-6 text-left text-2xl font-bold">
        Berechne den Potenzwert:
      </h2>
      <NewExerciseButton makeNewExercise={makeNewExercise} />
      <div className="ml-0.5 text-2xl font-bold" id="number-input">
        <span className="text-newgreen">
          {base}
          <sup className="ml-0.5">{power}</sup>
        </span>
        {' = '}
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
            'ml-0.5 w-[7.8rem] rounded-lg bg-[#d8f5ef] p-2 text-2xl ',
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
    </div>
  )
}
