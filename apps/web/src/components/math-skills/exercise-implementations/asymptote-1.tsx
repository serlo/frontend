import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildJSX, buildLatex } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}

export function Asymptote1() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-1, 1, 2, -2, -3, 3, 0.5, 0.2, 1.5])
        const b = randomIntBetween(-4, 4)
        const c = randomIntBetween(-4, -1)
        const d = randomIntBetween(-4, 4)
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
              Bestimmen Sie die Definitions-, Wertemenge und Asymptoten der
              Funktion:
            </p>
            <p className="serlo-highlight-gray">
              y = {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
              {data.b === 0 ? 'x' : '(x ' + pp(-data.b, 'merge_op') + ')'}
              <sup>{pp(data.c)}</sup>{' '}
              {data.d === 0 ? null : pp(data.d, 'merge_op')}
            </p>
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderSolution={(data) => {
        return (
          <>
            <p>
              Beachte, für welche x-Werte der Term{' '}
              {data.b === 0 ? 'x' : '(x ' + pp(-data.b, 'merge_op') + ')'}
              <sup>{pp(data.c)}</sup> nicht definiert ist. Folgere daraus die
              Definitionsmenge:
            </p>
            <p className="serlo-highlight-green">
              D = {buildLatex('\\R')}\{'{'}
              {pp(data.b)}
              {'}'}
            </p>
            <p>Bestimme die Asymptoten:</p>
            <p className="serlo-highlight-green">
              x = {pp(data.b)} und y = {pp(data.d)}
            </p>
            {data.c % 2 === 0 && (
              <>
                <p>
                  Der Term{' '}
                  {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
                  {data.b === 0 ? 'x' : '(x ' + pp(-data.b, 'merge_op') + ')'}
                  <sup>{pp(data.c)}</sup> bleibt immer{' '}
                  {data.a < 0 ? 'negativ' : 'positiv'}, für die Wertemenge gilt
                  daher:
                </p>
                <p className="serlo-highlight-green">
                  W = {'{'}y | y {data.a > 0 ? '>' : '<'} {pp(data.d)}
                  {'}'}
                </p>
              </>
            )}
            {data.c % 2 !== 0 && (
              <>
                <p>
                  Der Term{' '}
                  {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
                  {data.b === 0 ? 'x' : '(x ' + pp(-data.b, 'merge_op') + ')'}
                  <sup>{pp(data.c)}</sup> wird nie null, für die Wertemenge gilt
                  daher:
                </p>
                <p className="serlo-highlight-green">
                  W = {buildLatex('\\R')}\{'{'}
                  {pp(data.d)}
                  {'}'}
                </p>
              </>
            )}

            <p className="mt-5">
              Graph für -6 &#8804; x &#8804; 6 und -6 &#8804; y &#8804; 6 als
              Hilfe:
            </p>
            {renderDiagram(data)}
          </>
        )
      }}
      renderHint={() => {
        return (
          <>
            <p>
              Der <strong>Definitionsbereich</strong> einer Funktion der Form
            </p>
            <p className="serlo-highlight-gray">
              y = a(x - b)<sup>c</sup> + d
            </p>
            <p>ist immer die Menge aller reellen Zahlen außer der Stelle b.</p>
            <p className="mt-3">
              Die <strong>Asymptoten</strong> haben immer die Gleichungen:
            </p>
            <p className="serlo-highlight-gray">y = d, x = b</p>
            <p>
              Der <strong>Wertebereich</strong> ist abhängig vom Grad und der
              Verschiebung in y-Richtung.
            </p>
          </>
        )
      }}
    />
  )

  function renderDiagram(data: DATA) {
    return buildJSX(() => {
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
          [-6, data.d],
          [6, data.d],
        ],
        { strokeColor: 'salmon' }
      )
      x.create(
        'line',
        [
          [data.b, -6],
          [data.b, 6],
        ],
        { strokeColor: 'salmon' }
      )

      x.create('text', [5.5, 0.75, `x`], {})
      x.create('text', [0.5, 5.5, `y`], {})
      x.create('functiongraph', [
        function (x: number) {
          const nenner = Math.pow(x - data.b, data.c)
          return data.a * nenner + data.d
        },
        -6,
        6,
      ])

      return x
    }, data)
  }
}
