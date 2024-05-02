import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  HighlightGray,
  HighlightGreen,
  MainTask,
} from '../components/content-components'
import { buildFrac, buildJSX } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface PlotData {
  a: number
  b: number
  c: number
  d: number
}

export function PlotFunction() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-1, 1, 2])
        const b = randomIntBetween(-3, 3)
        const c = randomIntBetween(-4, -1)
        const d = randomIntBetween(-4, 4)
        const data: PlotData = {
          a,
          b,
          c,
          d,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <MainTask>Skizziere den Graphen der Funktion:</MainTask>
            <HighlightGreen>
              y = {data.a === -1 ? '-' : null}{' '}
              {buildFrac(
                <>{data.a !== -1 ? data.a : -data.a}</>,
                <>
                  {data.b === 0 || data.c === -1 ? null : '('}x{' '}
                  {data.b > 0 ? '+' : null} {data.b !== 0 ? data.b : null}
                  {data.b === 0 || data.c === -1 ? null : ')'}
                  <sup>{data.c !== -1 ? -data.c : null}</sup>
                </>
              )}{' '}
              {data.d > 0 && data.d !== 0 ? '+' : null}{' '}
              {data.d !== 0 ? data.d : null}
            </HighlightGreen>
            <br />
            <br />
            <i>
              Lege dafür ein Koordinatensystem mit -6 &#8804; x &#8804; 6 und -6
              &#8804; y &#8804; 6 an.
            </i>
          </>
        )
      }}
      renderSolution={({ data }) => {
        return (
          <>
            Skizziere den Graphen der Funktion:
            <br />
            <HighlightGray>
              y = {data.a === -1 ? '-' : null}{' '}
              {buildFrac(
                <>{data.a !== -1 ? data.a : -data.a}</>,
                <>
                  {data.b === 0 || data.c === -1 ? null : '('}x{' '}
                  {data.b > 0 ? '+' : null} {data.b !== 0 ? data.b : null}
                  {data.b === 0 || data.c === -1 ? null : ')'}
                  <sup>{data.c !== -1 ? -data.c : null}</sup>
                </>
              )}{' '}
              {data.d > 0 && data.d !== 0 ? '+' : null}{' '}
              {data.d !== 0 ? data.d : null}
            </HighlightGray>
            <br />
            <br />
            Zeichne dazu zuerst die waagerechte Asymptote mit der Gleichung:
            <br />
            <HighlightGray>y = {data.d}</HighlightGray>
            <br />
            <br />
            Zeichne als Nächstes die senkrechte Asymptote mit der Gleichung:
            <br />
            <HighlightGray>x = {-data.b}</HighlightGray>
            <br />
            <br />
            Berücksichtige den Grad der Funktion und ob der Graph durch ein
            negatives Vorzeichen gespiegelt ist. Zeichne den Graphen mithilfe
            der Asymptoten.
            <br />
            <br />
            Graph für -6 &#8804; x &#8804; 6 und -6 &#8804; y &#8804; 6:
            <br />
            {renderDiagram(data)}
          </>
        )
      }}
      renderHint={({ data }) => {
        return (
          <>
            Diese Funktion hat die Form:
            <br />
            <HighlightGray>
              y ={' '}
              {buildFrac(
                <>a</>,
                <>
                  (x - b) <sup>c</sup>
                </>
              )}{' '}
              + d
            </HighlightGray>
            <br />
            <br />
            Dabei sind:
            <ol>
              <li>· a die Streckung in y-Richtung,</li>
              <li>· b die Verschiebung in x-Richtung,</li>
              <li>· c der Grad der Funktion und</li>
              <li>· d die Verschiebung in y-Richtung.</li>
            </ol>
            Wenn a negativ ist, ist der Graph in y-Richtung gespiegelt.
            <br />
            <br />
            Beim Skizzieren hilft es, erst den Graphen von{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              x<sup>{data.c}</sup>
            </span>{' '}
            zu zeichnen und anschließend die Verschiebungen etc. auszuführen.
          </>
        )
      }}
    />
  )
}

function renderDiagram(data: PlotData) {
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
        [-data.b, -6],
        [-data.b, 6],
      ],
      { strokeColor: 'salmon' }
    )
    x.create(
      'line',
      [
        [-6, data.d],
        [6, data.d],
      ],
      { strokeColor: 'salmon' }
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
  }, data)
}
