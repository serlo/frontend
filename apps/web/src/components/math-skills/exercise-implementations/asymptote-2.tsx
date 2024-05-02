import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  HighlightGray,
  HighlightGreen,
  MainTask,
} from '../components/content-components'
import { buildJSX, buildLatex } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface PlotData {
  a: number
  b: number
  c: number
}

export function Asymptote2() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-2, -1, 2, 0.5])

        const b = randomItemFromArray([2, 3, 0.5, 0.25, 5])

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
            <MainTask>
              Bestimmen Sie die Definitions-, Wertemenge und Asymptote der
              Funktion mit x, y {buildLatex('\\in \\R')}:
            </MainTask>
            <p className="serlo-highlight-gray">
              y = {data.a === -1 ? '-' : pp(data.a)}{' '}
              {data.a === -1 ? null : '·'} {data.b === 2.718 ? 'e' : pp(data.b)}
              <sup>x</sup> {data.c > 0 ? '+' : data.c < 0 ? '-' : null}{' '}
              {data.c !== 0 ? data.c : null}
            </p>
          </>
        )
      }}
      renderSolution={({ data }) => {
        return (
          <>
            <p>
              Bei der Definitionsmenge für die Exponentialfunktion gibt es keine
              Einschränkungen. Sie ist gleich der Menge der reellen Zahlen.
            </p>
            <p className="serlo-highlight-green">D = {buildLatex('\\R')}</p>
            <p>Lies die Gleichung der Asymptote ab:</p>
            <p className="serlo-highlight-green">y = {data.c}</p>
            <p>
              Der Wertebereich setzt sich aus allen Werten{' '}
              {data.a > 0 ? 'oberhalb' : 'unterhalb'} der Asymptote zusammen
              (der Faktor der Funktion ist {data.a > 0 ? 'positiv' : 'negativ'}
              ):
            </p>
            <HighlightGreen>
              W = {'{'} y |{data.a > 0 ? ' y > ' + data.c : ' y < ' + data.c}
              {'}'}
            </HighlightGreen>
            <br />
            <br />
            Graph für -6 &#8804; x &#8804; 6 und -6 &#8804; y &#8804; 6 als
            Hilfe:
            <br />
            {renderDiagram(data)}
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderHint={({ data }) => {
        return (
          <>
            Der <strong>Definitionsbereich</strong> einer Exponentialfunktion
            <HighlightGray>
              y = a · b<sup>x</sup> + c
            </HighlightGray>
            <br />
            <br />
            ist immer die Menge der reellen Zahlen.
            <br />
            Die <strong>Asyptote</strong> hat immer die Gleichung:
            <br />
            <HighlightGray>y = c</HighlightGray>
            <br />
            <br />
            Die Asymptote bildet die Grenze zum <strong>Wertebereich</strong>.
            Abhängig davon, ob a positiv oder negativ ist, sind alle Werte
            darüber oder darunter der Wertebereich.
          </>
        )
      }}
    />
  )

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
        x.create('functiongraph', [
          function (x: number) {
            return data.a * Math.pow(data.b, x) + data.c
          },
          -6,
          6,
        ])
        return x
      },
      'jxgbox',
      data
    )
  }
}
