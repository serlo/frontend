import { SpoilerRenderer } from '@editor/plugins/spoiler/renderer'
import { useState } from 'react'

import { ExStatus } from '../feedback/execise-feedback'
import { ExerciseSelfFeedback } from '../feedback/execise-self-feedback'
import { SkipExerciseButton } from '../feedback/skip-exercise-button'

interface SelfEvaluationExerciseProps<DATA> {
  generator: () => DATA
  renderTask: (data: DATA) => JSX.Element
  renderSolution: (data: DATA) => JSX.Element // maybe turn into array of steps
  renderHint?: () => JSX.Element // maybe turn into array of steps
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

  return (
    <>
      {renderTask(data)}
      <div className="h-12"></div>
      <SkipExerciseButton
        makeNewExercise={() => {
          setData(generator())
          setShowSolution(false)
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
            content={<div className="mt-2 p-side">{renderHint()}</div>}
          />
        </div>
      )}
    </>
  )
}
