import { SpoilerRenderer } from '@editor/plugins/spoiler/renderer'
import { faCalculator, faSlash } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'

import { ExStatus } from '../feedback/execise-feedback'
import { ExerciseSelfFeedback } from '../feedback/execise-self-feedback'
import { SkipExerciseButton } from '../feedback/skip-exercise-button'
import { CalculatorAllowedContext } from '../utils/calculator-allowed-context'
import { FaIcon } from '@/components/fa-icon'

interface SelfEvaluationExerciseProps<DATA> {
  generator: () => DATA
  renderTask: (data: DATA) => JSX.Element
  renderSolution: (data: DATA) => JSX.Element // maybe turn into array of steps
  renderHint?: (data: DATA) => JSX.Element // maybe turn into array of steps
  centAmount?: number
}

export function SelfEvaluationExercise<T>({
  generator,
  renderTask,
  renderSolution,
  centAmount,
  renderHint,
}: SelfEvaluationExerciseProps<T>) {
  const [data, setData] = useState(generator())
  const [exStatus, setExStatus] = useState<ExStatus>('fresh')
  const [showSolution, setShowSolution] = useState(false)
  const [showStrategy, setShowStrategy] = useState(false)
  const calculatorAllowed = useContext(CalculatorAllowedContext)

  return (
    <>
      {renderTask(data)}
      <div className="mb-4 mt-12 border-y-2 border-stone-100 py-2 text-stone-500">
        {renderToolHints()}
      </div>
      <SkipExerciseButton
        makeNewExercise={() => {
          setData(generator())
          setShowSolution(false)
          setShowStrategy(false)
        }}
      />
      <div className="h-4"></div>
      Und wenn du fertig bist:
      <div className="-ml-side mt-2">
        <SpoilerRenderer
          openOverwrite={showSolution}
          setOpenOverwrite={setShowSolution}
          title={<>Lösung anzeigen</>}
          content={
            <div className="mt-2 p-side">
              {renderSolution(data)}
              <ExerciseSelfFeedback
                exStatus={exStatus}
                setExStatus={setExStatus}
                onNewExecise={() => {
                  setData(generator())
                  setShowSolution(false)
                }}
                centAmount={centAmount}
              />
            </div>
          }
        />
      </div>
      {renderHint && (
        <div className="-ml-side mt-2">
          <SpoilerRenderer
            openOverwrite={showStrategy}
            setOpenOverwrite={setShowStrategy}
            title={<>Tipps</>}
            content={<div className="mt-2 p-side">{renderHint(data)}</div>}
          />
        </div>
      )}
    </>
  )

  function renderToolHints(){
    return (
      <i className="flex justify-between">
          Rechne am Besten mit Stift und Papier.{' '}
          <>
            <span>
              {calculatorAllowed ? (
                <>
                  <FaIcon icon={faCalculator} />
                  Taschenrechner ist erlaubt &nbsp;
                </>
              ) : (
                <>
                  <span className="relative inline-block w-5 -translate-y-0.25">
                    <FaIcon
                      icon={faCalculator}
                      className="absolute -top-3 left-1"
                    />
                    <FaIcon icon={faSlash} className="absolute -top-3" />
                  </span>
                  Ohne Taschenrechner
                </>
              )}
            </span>
          </>
        </i>
    )
  }
}
