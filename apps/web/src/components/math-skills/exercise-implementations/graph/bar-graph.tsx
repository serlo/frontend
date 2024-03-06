import { useState } from 'react'

import { BarGraphSVG } from './bar-chart-svg'
import { ExStatus, ExerciseFeedback } from '../../feedback/execise-feedback'

interface BarGraphProps {
  generator: () => number
  centAmount?: number
}

export function BarGraph({ generator, centAmount }: BarGraphProps) {
  // const [data, setData] = useState(generator())
  const [exStatus, setExStatus] = useState<ExStatus>('fresh')
  // const { values } = data
  const isCorrect = false // TODO

  return (
    <>
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
        exStatus={exStatus}
        setExStatus={setExStatus}
        isCorrect={isCorrect}
        shakeElementQuery="#order-values-draggables" // TODO
        centAmount={centAmount}
        onNewExecise={() => {
          console.log('TODO: reset states')
        }}
      />
    </>
  )
}
