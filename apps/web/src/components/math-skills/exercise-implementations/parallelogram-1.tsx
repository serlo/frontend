import { useState, useEffect } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { JSXGraphWrapper } from '../utils/jsx-graph-wrapper'
import { buildVec, buildVec2 } from '../utils/math-builder'

interface DATA {
  x: number
}

export function Parallelogram1() {
  const phi = <span className="font-mono">ϕ</span>
  return (
    <SelfEvaluationExercise
      generator={() => {
        return { x: 4 }
      }}
      renderTask={() => (
        <>
          <p className="text-2xl">
            Seien die Pfeile {buildVec('OT')} = {buildVec2(-2, 4)} und{' '}
            {buildVec(
              <>
                OR<sub>n</sub>
              </>
            )}{' '}
            ={' '}
            {buildVec2(
              <>5 + 5 · sin {phi}</>,
              <>
                6 · cos<sup>2</sup> {phi}
              </>
            )}{' '}
            gegeben.
          </p>
          <p className="mt-4 text-2xl">
            Diese spannen mit dem Ursprung O ( 0 | 0 ) für {phi} ∈ [0°; 90°]
            Parallelogramme OR<sub>n</sub>S<sub>n</sub>T auf.
          </p>
          <p className="mt-4 text-2xl">
            Berechnen Sie die Koordination des Pfeils{' '}
            {buildVec(
              <>
                OR<sub>1</sub>
              </>
            )}{' '}
            für {phi} = 30°. Zeichnen Sie dann das Parallelogramm in ein
            Koordinatensystem ein.
          </p>
          <p className="mt-4 text-lg">Platzbedarf: -3 ≤ x ≤ 11; 0 ≤ y ≤ 10</p>
        </>
      )}
      renderSolution={(data) => (
        <>
          <p></p>
          <SubComponent data={data} />
        </>
      )}
      centAmount={35}
    />
  )
}

function SubComponent({ data }: { data: DATA }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-3, 11, 9, -1],
      showNavigation: false,
      showCopyright: false,
      axis: true,
    })

    setBoard(b)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <JSXGraphWrapper id="jxgbox" width={350} height={350} />
}
