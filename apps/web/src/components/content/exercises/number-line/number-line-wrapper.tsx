import { FaIcon } from '@editor/package'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import * as confetti from 'canvas-confetti' // why is this throwing warnings? sigh ..
import { useEffect, useState } from 'react'

import { ArrowButtonNavigation } from './arrow-button-navigation'
import { NumberLine } from './number-line'
import { cn } from '@/helper/cn'
import { showToastNotice } from '@/helper/show-toast-notice'

// randomize or create a lot more
const exampleValues = [
  // searchedValue, labeledValue, maxValue
  [9000, 6000, 12000],
  [6000, 8000, 8000],
  [120, 200, 400],
  [130, 400, 400],
]

function getExampleIndex() {
  return Math.floor(Math.random() * exampleValues.length)
}

/*
 * can only handle positive values up to about six digits
 */
export function NumberLineWrapper() {
  const [selectedValue, setSelectedValue] = useState(-1) // move outside for actual exercise

  const [exampleIndex, setExampleIndex] = useState(0)
  const [searchedValue, labeledValue, maxValue] = exampleValues[exampleIndex]

  const [isChecked, setIsChecked] = useState(false)

  const isCorrect = selectedValue === searchedValue

  const onCheck = () => {
    if (isChecked || selectedValue === 0) return

    console.log({ selectedValue })
    console.log({ searchedValue })
    if (isCorrect) {
      void confetti.default()
    } else {
      const element = document.getElementById('number-line')?.parentElement
      element?.classList.add('animate-shake')
      setTimeout(() => {
        element?.classList.remove('animate-shake')
      }, 1000)
    }
    setIsChecked(true)
  }

  function newExercise() {
    setExampleIndex(getExampleIndex())
    setSelectedValue(0)
    setIsChecked(false)
  }

  useEffect(newExercise, [])

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') isChecked ? newExercise() : onCheck()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        document.getElementById('number-line')?.focus()
      }
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, searchedValue, isChecked])

  return (
    <div className="relative mx-12 my-12 max-w-lg">
      <h2 className="block pb-8 text-left text-2xl font-bold">
        Wo ist die <span className="text-newgreen">{searchedValue}</span>?
      </h2>

      <button
        className="group serlo-button-light absolute -right-9 top-0 z-50 flex h-9 items-center"
        onClick={newExercise}
      >
        <span
          className={cn(
            'inline-block h-0 w-0 overflow-clip text-sm',
            'group-hover:ml-1 group-hover:mr-2 group-hover:h-auto group-hover:w-auto',
            'group-focus-visible:ml-1 group-focus-visible:mr-2 group-focus-visible:h-auto group-focus-visible:w-auto'
          )}
        >
          Andere Aufgabe
        </span>
        <FaIcon icon={faArrowsRotate} />
      </button>

      <NumberLine
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        maxValue={maxValue}
        labeledValue={labeledValue}
        searchedValue={searchedValue}
        isChecked={isChecked}
        isCorrect={isCorrect}
      />

      <div className="flex h-3 justify-between">
        {isChecked ? (
          <p>
            {isCorrect ? (
              'Sehr gut gemacht 👌'
            ) : (
              <>
                Leider nicht richtig.
                <br />
                Du hast die Zahl <b>{selectedValue}</b> ausgewählt.
              </>
            )}
          </p>
        ) : (
          <ArrowButtonNavigation
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            maxValue={maxValue}
          />
        )}
        {selectedValue === 0 ? (
          <div className="-mr-8 block text-right text-gray-500">
            Klicke auf den Zeitstrahl
            <br />
            oder benutze die Pfeilbuttons
          </div>
        ) : (
          <button
            className="serlo-button-blue -mr-10 mt-1.5 h-8"
            onClick={isChecked ? newExercise : onCheck}
          >
            {isChecked ? 'Nächste Aufgabe' : 'Überprüfen'}
          </button>
        )}
      </div>
    </div>
  )
}
