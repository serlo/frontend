import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildJSX } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}

export function PlotFunction() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-1, 1, 2, -2, -3, 3, 0.5, 0.2, 1.5])
        const b = randomIntBetween(-3, 3)
        const c = randomIntBetween(-4, -1)
        const d = randomIntBetween(-3, 3)
        const data: DATA = {
          a,
          b,
          c,
          d,
        }
        return data
      }}
      renderTask={(data) => {
        return (
          <>
            <p className="serlo-main-task">
              Zeichnen Sie den Graphen der Funktion in ein Koordinatensystem:
            </p>
            <p className="serlo-highlight-gray">
              y = {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
              {data.b === 0 ? 'x' : '(x ' + pp(-data.b, 'merge_op') + ')'}
              <sup>{pp(data.c)}</sup>{' '}
              {data.d === 0 ? null : pp(data.d, 'merge_op')}
            </p>
            <p className="mt-4">
              <i>
                Für die Zeichung: -6 &#8804; x &#8804; 6 und -6 &#8804; y
                &#8804; 6
              </i>
            </p>
          </>
        )
      }}
      renderSolution={(data) => {
        return (
          <>
            <p>
              Erstelle eine Wertetabelle. Die Asymptoten können beim Zeichnen
              helfen:
            </p>
            {renderDiagram(data)}
          </>
        )
      }}
    />
  )
}

function renderDiagram(data: DATA) {
  return buildJSX(
    () => {
      const x = JXG.JSXGraph.initBoard('jxgbox', {
        boundingbox: [-6, 6, 6, -6],
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
      x.create(
        'line',
        [
          [-data.b, -6],
          [-data.b, 6],
        ],
        { strokeColor: 'PeachPuff' }
      )
      x.create(
        'line',
        [
          [-6, data.d],
          [6, data.d],
        ],
        { strokeColor: 'PeachPuff' }
      )

      x.create('text', [5.5, 0.75, `x`], {})
      x.create('text', [0.5, 5.5, `y`], {})
      x.create('functiongraph', [
        function (x: number) {
          const nenner = Math.pow(x + data.b, data.c)
          return data.a * nenner + data.d
        },
        -6,
        6,
      ])
      return x
    },
    data,
    { width: 500, height: 500 }
  )
}
