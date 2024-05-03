/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac, buildJSX } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PlotData {
  a: boolean
  b: number
  c: number
}

export function ValueSetParabola() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([true, false])
        const b = randomIntBetween(-7, 7)
        const c = randomIntBetween(-7, 7)
        const data: PlotData = {
          a,
          b,
          c,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <p className="serlo-main-task">
              Bestimmen Sie die Wertemenge der Parabel:
            </p>
            <p className="serlo-highlight-gray">
              y = {data.a ? null : '-'} x<sup>2</sup> + bx + c
            </p>
            <p className="serlo-main-task">
              Der Scheitelpunkt ist gegeben durch S ( {data.b} | {data.c} ).
            </p>
          </>
        )
      }}
      renderSolution={({ data }) => {
        return (
          <>
            Da die Parabel nach {data.a === true ? 'oben' : 'unten'} geöfnet
            ist, ist der Wertebereich die Menge der reellen Zahlen{' '}
            <strong>{data.a === true ? 'oberhalb' : 'unterhalb'}</strong> des
            Scheitels:
            <br />
            <p className="serlo-highlight-green">
              W = {'{'} y | y {data.a === true ? '≥' : '≤'}{' '}
              {data.c > 0 || data.c === 0 ? data.c : '- ' + -data.c} {'}'}
            </p>
            <br />
            <br />
            Graph für -10 &#8804; x &#8804; 10 und -10 &#8804; y &#8804; 10 als
            Hilfe:
            <br />
            {renderDiagram(data)}
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ data }) => {
        return (
          <>
            Für den Wertebereich untersuchen wir den Öffnungsfaktor und den
            y-Wert des Scheitel der Parabel:
            <br />
            <p className="serlo-highlight-gray">y =</p>
            <span className="mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3 text-2xl">
              {data.a ? '1 · ' : '(-1) · '}{' '}
            </span>
            <p className="serlo-highlight-gray">
              (x {data.b > 0 && data.b !== 0 ? '- ' + data.b : '+ ' + -data.b})
              <sup>2</sup>{' '}
            </p>
            <span className="mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3 text-2xl">
              {data.c > 0 && data.c !== 0 ? '+ ' + data.c : '- ' + -data.c}
            </span>
            <br />
            <br />
            Der Öffnungsfaktor entscheidet darüber, ob alle Werte oberhalb oder
            unterhalb des Scheitels von der Funktion angenommen werden.
            <br />
            <br />
            Die y-Koordinate des Scheitels gibt die Grenze zum Wertebereich vor.
          </>
        )
      }}
    />
  ) // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function renderDiagram(data: PlotData) {
    return buildJSX(() => {
      const x = JXG.JSXGraph.initBoard('jxgbox', {
        boundingbox: [-10, 10, 10, -10],
        showNavigation: false,
        showCopyright: false,
      })

      x.create('axis', [
        [0.0, 0.0],
        [0.0, 1.0],
      ])
      x.create('axis', [
        [0.0, 0.0],
        [1.0, 0.0],
      ])

      x.create('text', [9, 0.75, `x`], {})
      x.create('text', [0.5, 9, `y`], {})

      {
        data.a
          ? x.create('functiongraph', [
              function (x: number) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return (x - data.b) * (x - data.b) + data.c
              },
              -10,
              10,
            ])
          : x.create('functiongraph', [
              function (x: number) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return -(x - data.b) * (x - data.b) + data.c
              },
              -10,
              10,
            ])
      }
      return x
    }, data)
  }
}
