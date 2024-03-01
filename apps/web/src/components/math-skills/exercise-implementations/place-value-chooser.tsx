import { ExerciseWrapper } from '../exercises/components/exercise-wrapper'
import { cn } from '@/helper/cn'

interface PlaceValueChooserProps {
  generator: () => { figure: number; searchedDigit: number }
  centAmount?: number
}

export function PlaceValueChooser({
  generator,
  centAmount,
}: PlaceValueChooserProps) {
  return (
    <ExerciseWrapper
      generator={generator}
      centAmount={centAmount}
      getCorrect={({ searchedDigit }) => searchedDigit}
      check={(digitIndex, { searchedDigit }) => digitIndex === searchedDigit}
      noUserInputText={<>Wähle eine Stelle aus</>}
      elementToShakeQuery="#place-value-chooser-wrapper"
      renderTaskAndInputs={({
        data,
        interactionState: selectedDigit,
        setInteractionState: setSelectedDigit,
        isChecked,
        isCorrect,
      }) => {
        const { figure, searchedDigit } = data
        const figureString = String(figure)
        const digitAmount = figureString.length

        return (
          <>
            <h2 className="pb-8 text-left text-2xl font-bold text-almost-black">
              Markiere den Stellenwert:{' '}
              <span className="text-newgreen">
                {getDigitString(searchedDigit)?.long}
              </span>
            </h2>
            <div
              id="place-value-chooser-wrapper"
              className="flex justify-center text-2xl font-bold"
            >
              {[...figureString].map((char, i) => {
                const digitIndex = digitAmount - i
                const isTicked = digitIndex === selectedDigit
                return (
                  <label key={char + i} className="cursor-pointer">
                    <input
                      id="place-value-chooser-input"
                      className="appearance-none opacity-0"
                      type="radio"
                      disabled={isChecked}
                      name={figureString}
                      value={char}
                      checked={isTicked}
                      onChange={() => setSelectedDigit(digitIndex)}
                    />
                    <span className={getSpanClasses({ isTicked, digitIndex })}>
                      {char}
                    </span>
                  </label>
                )
              })}
            </div>
          </>
        )

        function getSpanClasses({
          isTicked,
          digitIndex,
        }: {
          isTicked: boolean
          digitIndex: number
        }) {
          return cn(
            'mx-0.25 inline-block min-w-[30px] rounded-md border-2 p-1.5 text-center',
            // default selection
            isTicked &&
              !isChecked &&
              'border-newgreen-600 bg-newgreen bg-opacity-10',
            // feedback
            isChecked &&
              isTicked &&
              isCorrect &&
              'border-newgreen-600 bg-newgreen bg-opacity-50',
            isChecked && isTicked && !isCorrect && 'border-red-300 bg-red-100',
            // feedback: actually correct:
            isChecked &&
              !isCorrect &&
              searchedDigit === digitIndex &&
              'border-newgreen-600 bg-newgreen bg-opacity-20'
          )
        }
      }}
    />
  )
}

function getDigitString(searchedDigit: number) {
  if (searchedDigit < 1 || searchedDigit > 7) return undefined
  return digitStrings[searchedDigit as keyof typeof digitStrings]
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
