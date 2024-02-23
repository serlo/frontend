import { FaIcon } from '@editor/package'
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons'
import * as confetti from 'canvas-confetti' // why is this throwing warnings? sigh ..
import { useEffect, useState } from 'react'

import { NumberLine } from './number-line'
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

  const onCheck = () => {
    console.log({ selectedValue })
    console.log({ searchedValue })
    if (selectedValue === searchedValue) {
      try {
        void confetti.default({ origin: { x: 0, y: 0.4 }, angle: 45 })
      } catch (e) {
        // don't care
      }
      return
    }
    showToastNotice('Leider nicht! 🎉')
  }

  useEffect(() => setExampleIndex(getExampleIndex()), [])

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onCheck()
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, searchedValue])

  return (
    <div className="relative mx-12 my-12 max-w-lg">
      <nav className="absolute -top-2 right-0 z-30">
        <button
          onClick={() => {
            changeValueBySteps(-5)
          }}
          type="button"
          className="serlo-button-light me-2 inline-flex items-center rounded-full p-2.5"
        >
          <FaIcon icon={faAnglesLeft} />
          <span className="sr-only">
            Position mehrere Schritte nach links verschieben
          </span>
        </button>
        <button
          onClick={() => {
            changeValueBySteps(-1)
          }}
          type="button"
          className="serlo-button-light me-2 inline-flex items-center rounded-full p-2.5"
        >
          <FaIcon icon={faAngleLeft} className="aspect-square" />
          <span className="sr-only">
            Position einen Schritt nach links verschieben
          </span>
        </button>
        <button
          onClick={() => {
            changeValueBySteps(1)
          }}
          type="button"
          className="serlo-button-light me-2 inline-flex items-center rounded-full p-2.5"
        >
          <FaIcon icon={faAngleRight} className="aspect-square" />
          <span className="sr-only">
            Position einen Schritt nach links verschieben
          </span>
        </button>
        <button
          onClick={() => {
            changeValueBySteps(5)
          }}
          type="button"
          className="serlo-button-light me-2 inline-flex items-center rounded-full p-2.5"
        >
          <FaIcon icon={faAnglesRight} />
          <span className="sr-only">
            Position mehrerer Schritte nach rechts verschieben
          </span>
        </button>
      </nav>
      <NumberLine
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        maxValue={maxValue}
        labeledValue={labeledValue}
        searchedValue={searchedValue}
      />

      <div className="flex justify-between">
        {selectedValue < 0 ? (
          'Klicke auf den Zeitstrahl oder benutze die Pfeilbuttons'
        ) : (
          <button className="serlo-button-green" onClick={onCheck}>
            Überprüfen
          </button>
        )}

        <button
          className="serlo-button-light"
          onClick={() => {
            setExampleIndex(getExampleIndex())
            setSelectedValue(0)
          }}
        >
          Neue Aufgabe
        </button>
      </div>
    </div>
  )

  function changeValueBySteps(steps: number) {
    const newValue = selectedValue + steps * (maxValue / 40)
    const limitedValue =
      newValue < 0 ? 0 : newValue > maxValue ? maxValue : newValue
    setSelectedValue(limitedValue)
  }
}
