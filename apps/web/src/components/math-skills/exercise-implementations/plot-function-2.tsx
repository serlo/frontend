import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { MainTask, HighlightGray } from '../components/content-components'
import { buildJSX } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface PlotData {
  a: number
  b: number
  c: number
}

export function PlotFunction2() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-2, -1, 2, 0.5])

        const b = randomItemFromArray([2, 3, 0.5, 0.25])

        const c = randomIntBetween(-2, 2)
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
            <MainTask>Skizzieren Sie den Graphen der Funktion:</MainTask>
            <p className="serlo-highlight-gray">
              y = {data.a === -1 ? '-' : pp(data.a)}{' '}
              {data.a === -1 ? null : '·'} {data.b === 2.718 ? 'e' : pp(data.b)}
              <sup>x</sup> {data.c > 0 ? '+' : data.c < 0 ? '-' : null}{' '}
              {data.c !== 0 ? Math.abs(data.c) : null}
            </p>
            <br />
            <br />
            <i>
              Platzbedarf für Koordinatensystem: -6 &#8804; x &#8804; 6 und -6
              &#8804; y &#8804; 6 an.
            </i>
          </>
        )
      }}
      renderSolution={({ data }) => {
        return (
          <>
            <p>
              Du kannst diese Aufgabe mithilfe einer Wertetabelle lösen. Diese
              Lösung nutzt den alternativen Weg über die Eigenschaften der
              Funktion. Beide Wege sind gleichwertig. Entsheide, welcher für
              dich besser funktioniert.
            </p>
            <br />
            Zeichne zuerst die Asymptote mit der Gleichung:
            <br />
            <HighlightGray>y = {data.c}</HighlightGray>
            <br />
            <br />
            Bestimme die Stelle, durch die der Graph an der y-Achse verläuft:
            <br />
            <HighlightGray>
              y = {data.a === -1 ? '-' : pp(data.a)}{' '}
              {data.a === -1 ? null : '·'} {data.b === 2.718 ? 'e' : pp(data.b)}
              <sup>0</sup> {data.c > 0 ? '+' : data.c < 0 ? '-' : null}{' '}
              {data.c !== 0 ? Math.abs(data.c) : null} ={' '}
              {data.a === -1 ? '-' : pp(data.a)} {data.a === -1 ? null : '·'} 1{' '}
              {data.c > 0 ? '+' : data.c < 0 ? '-' : null}{' '}
              {data.c !== 0 ? Math.abs(data.c) : null} = {pp(data.a + data.c)}
            </HighlightGray>
            <p className="mt-3">
              Die Basis ist {data.b > 1 ? 'größer' : 'kleiner'} als 1, daher{' '}
              {data.b > 1
                ? 'entfernt sich der Graph von der Asymptote'
                : 'nähert sich der Graph der Asymptote'}{' '}
              nach rechts. Der Vorfaktor ist{' '}
              {data.a > 0 ? 'positiv' : 'negativ'}, der Graph verläuft{' '}
              {data.a > 0 ? 'über' : 'unter'} der Asymptote.
            </p>
            <p className="mt-3">
              Skizziere den Graphen mithilfe der ermittelten Informationen.
            </p>
            <p className="mt-3">
              Graph für -6 &#8804; x &#8804; 6 und -6 &#8804; y &#8804; 6:
            </p>
            {renderDiagram(data)}
          </>
        )
      }}
      renderHint={() => {
        return (
          <>
            Die Exponentialfunktion hat die Form:
            <br />
            <HighlightGray>
              y = a · b<sup>x</sup> + c
            </HighlightGray>
            <br />
            <br />
            Skizziere am Besten zuerst die Asymptote y = c als Hilfslinie.
            <br />
            <br />
            An der Stelle y<sub>0</sub> = a + c geht der Graph durch die
            y-Achse.
            <br />
            <br />
            Anhand der Basis b kannst du feststellen, ob es sich um Wachstum
            oder Zerfall handelt und wie stark der Graph wächst/fällt.
            <br />
            <br />
            Wenn a negativ ist, ist der Graph in y-Richtung gespiegelt.
          </>
        )
      }}
    />
  )
}
function renderDiagram(data: PlotData) {
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

      x.create('text', [5.5, 0.75, `x`], {})
      x.create('text', [0.5, 5.5, `y`], {})
      x.create(
        'functiongraph',
        [
          function (x: number) {
            return data.a * Math.pow(data.b, x) + data.c
          },
          -6,
          6,
        ],
        { strokeWidth: 3 }
      )
      x.create(
        'functiongraph',
        [
          function () {
            return data.c
          },
          -6,
          6,
        ],
        { strokeColor: 'salmon' }
      )
      x.create('point', [0, data.a + data.c], {
        label: { visible: false },
        fixed: true,
      })
      return x
    },
    'jxgbox',
    data
  )
}
