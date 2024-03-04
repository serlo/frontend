import { useState } from 'react'

import { ExStatus, ExerciseFeedback } from '../feedback/execise-feedback'
import { cn } from '@/helper/cn'

interface PlaceValueChooserProps {
  generator: () => { figure: number; searchedDigit: number }
  centAmount?: number
}

export function PlaceValueChooser({
  generator,
  centAmount,
}: PlaceValueChooserProps) {
  const [data, setData] = useState(generator())
  const [exStatus, setExStatus] = useState<ExStatus>('fresh')
  const { figure, searchedDigit } = data
  const figureString = String(figure)
  const digitAmount = figureString.length
  const [selectedDigit, setSelectedDigit] = useState<number | undefined>(
    undefined
  )
  const isCorrect = selectedDigit === searchedDigit

  return (
    <>
      <h2 className="pb-8 text-left text-2xl font-bold text-almost-black">
        Markiere den Stellenwert:{' '}
        <span className="text-newgreen">{getDigitString()?.long}</span>
      </h2>
      <div
        id="place-value-chooser-wrapper"
        className="flex justify-center text-2xl font-bold"
      >
        {[...figureString].map((char, i) => {
          const digitIndex = digitAmount - i
          const isTicked = digitIndex === selectedDigit
          const isCorrect = digitIndex === searchedDigit
          return (
            <label key={char + i} className="cursor-pointer">
              <input
                id="place-value-chooser-input"
                className="appearance-none opacity-0"
                type="radio"
                disabled={exStatus === 'correct' || exStatus === 'revealed'}
                name={figureString}
                value={char}
                checked={isTicked}
                onChange={() => {
                  setSelectedDigit(digitIndex)
                  if (exStatus === 'incorrect') setExStatus('fresh')
                }}
              />
              <span
                className={cn(
                  'mx-0.25 inline-block min-w-[30px] rounded-md border-2 p-1.5 text-center transition-all',
                  getColorClasses(isCorrect, isTicked),
                  exStatus === 'revealed' && !isCorrect && 'opacity-60'
                )}
              >
                {char}
              </span>
            </label>
          )
        })}
      </div>

      <ExerciseFeedback
        noUserInput={selectedDigit === undefined}
        noUserInputText={<>Wähle eine Stelle aus</>}
        exStatus={exStatus}
        setExStatus={setExStatus}
        isCorrect={isCorrect}
        shakeElementQuery="#place-value-chooser-wrapper"
        focusElementQuery="#place-value-chooser-input"
        onNewExecise={() => {
          setData(generator())
          setSelectedDigit(undefined)
        }}
        centAmount={centAmount}
      />
    </>
  )

  function getDigitString() {
    if (searchedDigit < 1 || searchedDigit > 7) return undefined
    return digitStrings[searchedDigit as keyof typeof digitStrings]
  }

  function getColorClasses(isCorrect: boolean, isTicked: boolean) {
    // revealed: actually correct:
    if (exStatus === 'revealed' && isCorrect) {
      return cn('border-newgreen-600 bg-newgreen bg-opacity-20')
    }

    if (!isTicked) return
    return cn(
      // default selection
      exStatus === 'fresh' && 'border-newgreen-600 bg-newgreen bg-opacity-10',
      exStatus === 'correct' && 'border-newgreen-600 bg-newgreen bg-opacity-50',
      (exStatus === 'incorrect' || exStatus === 'revealed') &&
        'border-red-300 bg-red-100'
    )
  }
}

const digitStrings = {
  1: { long: 'Einer', short: 'E' },
  2: { long: 'Zehner', short: 'Z' },
  3: { long: 'Hunderter', short: 'H' },
  4: { long: 'Tausender', short: 'T' },
  5: { long: 'Zehntausender', short: 'Z' },
  6: { long: 'Hunderttausender', short: 'H' },
  7: { long: 'Million', short: 'M' },
}
