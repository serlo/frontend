import { SpoilerRenderer } from '@editor/plugins/spoiler/renderer'
import { useState } from 'react'

import { ExStatus, ExerciseFeedback } from '../feedback/execise-feedback'

interface SelfEvaluationExerciseProps<DATA> {
  generator: () => DATA
  renderTask: (data: DATA) => JSX.Element
  renderSolution: (data: DATA) => JSX.Element // maybe turn into array of steps
  centAmount?: number
}

export function SelfEvaluationExercise<T>({
  generator,
  renderTask,
  renderSolution,
  centAmount,
}: SelfEvaluationExerciseProps<T>) {
  const [data, setData] = useState(generator())
  const [exStatus, setExStatus] = useState<ExStatus>('fresh')
  const [showSolution, setShowSolution] = useState(false)

  return (
    <>
      {renderTask(data)}
      Und wenn du fertig bist:
      <div className="-ml-side mt-2">
        <SpoilerRenderer
          openOverwrite={showSolution}
          setOpenOverwrite={setShowSolution}
          title={<>Lösung anzeigen</>}
          content={
            <div className="mt-2 p-side">
              {renderSolution(data)}
              <div className="mt-4 border-t border-t-gray-200 py-5">
                <b className="text-lg">Und wie lief&apos;s?</b>
                <div className="mt-2 flex justify-between">
                  <button
                    className="serlo-button-blue text-lg"
                    onClick={() => setExStatus('revealed')}
                  >
                    Nicht (ganz) richtig gelöst
                  </button>
                  <button
                    className="serlo-button-green text-lg"
                    onClick={() => setExStatus('correct')}
                  >
                    Erfolgreich gelöst!
                  </button>
                </div>
              </div>
            </div>
          }
        />
      </div>
      <ExerciseFeedback
        noUserInput={exStatus !== 'correct'}
        noUserInputText={undefined}
        exStatus={exStatus}
        setExStatus={setExStatus}
        isCorrect={exStatus === 'correct'}
        onNewExecise={() => {
          setData(generator())
          setShowSolution(false)
        }}
        centAmount={centAmount}
        forceCheck={exStatus === 'revealed'}
      />
    </>
  )
}
