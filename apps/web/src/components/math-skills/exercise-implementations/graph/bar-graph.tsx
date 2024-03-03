import { useEffect, useState } from 'react'

import { BarGraphSVG } from './bar-chart-svg'
import { ExerciseFeedback } from '../../feedback/execise-feedback'
import { NewExerciseButton } from '../../number-line-exercise/new-exercise-button'

interface BarGraphProps {
  generator: () => number
  centAmount?: number
}

export function BarGraph({ generator, centAmount }: BarGraphProps) {
  const [data, setData] = useState(generator())
  const [isChecked, setIsChecked] = useState(false)
  // const { values } = data
  const isCorrect = false // TODO

  function makeNewExercise() {
    setData(generator())
    setIsChecked(false)
    setTimeout(() => {
      // TODO
      document.getElementById('place-value-chooser-input')?.focus()
    })
  }

  useEffect(() => {
    // const keyEventHandler = (e: KeyboardEvent) => {
    //   // TODO?
    // }
    // document.addEventListener('keydown', keyEventHandler)
    // return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, data])

  return (
    <>
      <NewExerciseButton makeNewExercise={makeNewExercise} />

      <div id="order-values-wrapper" className="sm:flex">
        <div>
          <BarGraphSVG maxValue={400} allowBarResize values={[200, 400, 100]} />
        </div>
        <div className="ml-2 flex flex-col">
          <h2 className="mt-10 pb-2 text-left text-2xl">Lese die Werte ab:</h2>
          <input />
        </div>
      </div>
      <ExerciseFeedback
        noUserInput={false}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        isCorrect={isCorrect}
        shakeElementId="order-values-draggables" // TODO
        makeNewExercise={makeNewExercise}
        centAmount={centAmount}
      />
    </>
  )
}
