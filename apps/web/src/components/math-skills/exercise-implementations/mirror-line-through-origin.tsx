import { useState, useEffect } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { autoResizeBoundingBox } from '../utils/auto-resize-bounding-box'
import { JSXGraphWrapper } from '../utils/jsx-graph-wrapper'
import { buildMat2, buildVec2 } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'

interface DATA {
  x: number
  y: number
  factor: number
}

export function MirrorLineThroughOrigin() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const factor = randomIntBetween(1, 19) / 10
        const x = randomIntBetween(-10, 10)
        const y = randomIntBetween(-10, 10)
        return { factor, x, y }
      }}
      renderTask={({ x, y, factor }) => (
        <>
          <p className="serlo-main-task">
            Der Punkt P( {x} | {y} ) wird durch Spiegelung an der Achse s mit
            y&nbsp;=&nbsp;{pp(factor)}x abgebildet. Berechnen Sie die
            Koordinaten von P&apos;. Runden Sie auf 2 Stellen nach dem Komma.
          </p>
        </>
      )}
      renderSolution={(data) => {
        const { x, y, factor } = data
        const alpha =
          Math.round((Math.atan(factor) / Math.PI) * 180 * 100) / 100

        const cos2alpha =
          Math.round(Math.cos(((2 * alpha) / 180) * Math.PI) * 100) / 100

        const sin2alpha =
          Math.round(Math.sin(((2 * alpha) / 180) * Math.PI) * 100) / 100

        const solX = x * cos2alpha + y * sin2alpha
        const solY = x * sin2alpha - y * cos2alpha

        return (
          <>
            <p>Bereche das Maß ⍺ mit Hilfe der Steigung m:</p>
            <p className="serlo-highlight-gray">
              m = {pp(factor)} &nbsp;&nbsp;&nbsp;&nbsp; tan ⍺ = {pp(factor)}
              <br />
              <br />⍺ = {pp(alpha)}°
            </p>
            <p>Berechne die Hilfswerte cos 2⍺ und sin 2⍺:</p>
            <p className="serlo-highlight-gray">
              cos 2⍺ = {pp(cos2alpha)}
              &nbsp;&nbsp;&nbsp;&nbsp; sin 2⍺ = {pp(sin2alpha)}
            </p>
            <p>Notiere die Abbildungsgleichung:</p>
            <p className="serlo-highlight-gray">
              {buildVec2("x'", "y'")} ={' '}
              {buildMat2(
                pp(cos2alpha),
                pp(sin2alpha),
                pp(sin2alpha),
                pp(-cos2alpha)
              )}{' '}
              ⊙ {buildVec2(x, y)}
            </p>
            <p>Berechne das Ergebnis:</p>
            <p className="serlo-highlight-green">
              P&apos;( {pp(solX)} | {pp(solY)} )
            </p>
            <p className="mt-8">
              Skizze zur Veranschaulichung (nicht Teil der Aufgabenstellung)
            </p>
            <SubComponent data={data} solX={solX} solY={solY} />
          </>
        )
      }}
    />
  )
}

function SubComponent({
  data,
  solX,
  solY,
}: {
  data: DATA
  solX: number
  solY: number
}) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)
  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: autoResizeBoundingBox([
        [data.x, data.y],
        [solX, solY],
        [0, 0],
      ]),
      showNavigation: false,
      showCopyright: false,
      axis: true,
    })

    b.create('point', [data.x, data.y], {
      name: 'P',
      fixed: true,
      color: 'gray',
      label: { autoPosition: true },
    })
    b.create('point', [solX, solY], {
      name: "P'",
      fixed: true,
      label: { autoPosition: true },
    })
    b.create(
      'functiongraph',
      [
        function (x: number) {
          return data.factor * x
        },
        -60,
        60,
      ],
      { strokeWidth: 2 }
    )

    setBoard(b)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <JSXGraphWrapper id="jxgbox" width={300} height={300} />
}
