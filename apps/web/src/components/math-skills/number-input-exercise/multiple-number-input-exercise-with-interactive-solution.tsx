import { useState } from 'react'

import { ExStatus, ExerciseFeedback } from '../feedback/execise-feedback'
import { arrayOfLength } from '@/helper/array-of-length'
import { cn } from '@/helper/cn'

interface MultipleNumberInputExerciseWithInteractiveSolutionProps<DATA> {
  generator: () => DATA
  numberOfInputs: number
  validateInputs: (inputData: string[], data: DATA) => boolean[]
  renderTask: (inputs: JSX.Element[], data: DATA) => JSX.Element
  renderSolution: (data: DATA) => JSX.Element
  renderHint: () => JSX.Element
  renderStepByStep: (data: DATA) => JSX.Element
  widthForDigits?: number
  centAmount?: number
  className?: string
}

// input supports ~ up to 7 digits without clipping
export function MultipleNumberInputExerciseWithInteractiveSolution<T>({
  generator,
  validateInputs,
  renderTask,
  renderHint,
  renderSolution,
  renderStepByStep,
  widthForDigits = 7,
  centAmount,
  className,
  numberOfInputs,
}: MultipleNumberInputExerciseWithInteractiveSolutionProps<T>) {
  const [inputValues, setInputValues] = useState(
    arrayOfLength(numberOfInputs).map(() => '')
  )
  const [exStatus, setExStatus] = useState<ExStatus>('fresh')
  const [data, setData] = useState(generator())

  const isCorrectArray = validateInputs(inputValues, data)

  const isCorrect = isCorrectArray.every(Boolean)
  const incorrectAmount =
    !isCorrect && isCorrectArray.filter((value) => !value).length
  const isDisabled = exStatus === 'correct'

  return (
    <>
      {renderTask(
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
          revealed: <></>,
          followUps: (
            <>
              <br />
              <b>Probier&apos;s einfach noch mal,</b>
              <br />
              oder{' '}
              <a
                className="serlo-link cursor-pointer"
                onClick={() => {
                  const details = document.getElementById(
                    'hint-details'
                  ) as HTMLDetailsElement
                  if (!details) return
                  details.open = true
                  details.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                schau&apos; dir die Tipps an
              </a>
              , oder{' '}
              <a
                className="serlo-link cursor-pointer"
                onClick={() => {
                  setExStatus('revealed')
                  document
                    .getElementById('hint-details')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                mach die Aufgabe Schritt für Schritt.
              </a>
              .
            </>
          ),
        }}
        isCorrect={isCorrect}
        shakeElementQuery="#number-input"
        focusElementQuery="#number-input-0"
        onNewExecise={() => {
          setData(generator())
          setInputValues(inputValues.map(() => ''))
          ;(
            document.getElementById('hint-details') as HTMLDetailsElement
          ).open = false
        }}
        centAmount={centAmount}
      />

      {renderHint ? (
        <>
          <details
            className="group grow"
            id="hint-details"
            open={exStatus === 'revealed'}
          >
            <summary className="serlo-button-light px-2.5 py-1.5">
              <h4>
                Tipps anzeigen{' '}
                <span className="inline-block group-open:translate-y-0.5 group-open:rotate-180">
                  ▾
                </span>
              </h4>
            </summary>
            <div className="mt-3 w-full rounded-xl bg-gray-50 p-3">
              {exStatus === 'revealed' ? (
                <>{renderStepByStep(data)}</>
              ) : (
                <>
                  {renderHint()}
                  <p className="mt-5">
                    <button
                      className="hover:bg-opacity-35 serlo-button-light bg-animal bg-opacity-30 px-2.5 py-1.5 text-almost-black hover:text-black"
                      onClick={() => setExStatus('revealed')}
                    >
                      Schritt für Schritt rechnen
                    </button>
                  </p>
                </>
              )}
            </div>
          </details>
        </>
      ) : null}

      <div className="h-24"></div>
      {renderSolution(data)}
    </>
  )
}
