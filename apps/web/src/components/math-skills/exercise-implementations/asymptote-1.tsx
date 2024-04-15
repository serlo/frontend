import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

/* eslint-disable no-empty-pattern */
import { SelfEvaluationExercise } from './self-evaluation-exercise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  MainTask,
  HighlightGreen,
  HighlightGray,
} from '../components/content-components'
import { buildFrac } from '../utils/math-builder'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomIntBetween } from '@/helper/random-int-between'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PlotData {
  a: number
  b: number
  c: number
  d: number
}

export function Asymptote1() {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTask={({ data }) => {
        return (
          <>
            <MainTask>
              Bestimme die Definitions-, Wertemenge und Asymptote der Funktion:
            </MainTask>
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
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderSolution={({ data }) => {
        return (
          <>
            Bestimme Definitions- und Wertebereich, sowie Asymptoten der
            Funktion:
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
            Die Definitionsmenge ist die Menge aller reellen Zahlen, so dass der
            Nenner nicht 0 ist:
            <br />
            <HighlightGreen>
              D = R \ {'{'}
              {-data.b}
              {'}'}
            </HighlightGreen>
            <br />
            <br />
            Der Graph hat zwei Asymptoten mit den Gleichungen:
            <br />
            <HighlightGreen>
              y = {data.d} und x = {-data.b}
            </HighlightGreen>
            <br />
            <br />
            Der Wertebereich setzt sich aus allen reellen Zahlen zusammen, die
            von der Funktion angenommen werden.
            <br />
            <br />
            {data.c % 2 === 0 && data.a > 0
              ? 'Diese Funktion hat einen geraden Grad und ist nicht gespiegelt. Bei der senkrechten Asymptote kommt sie von oben und geht nach oben. Dabei bleibt sie immer oberhalb der Asymptote:'
              : null}
            {data.c % 2 === 0 && data.a < 0
              ? 'Diese Funktion hat einen geraden Grad und ist gespiegelt. Bei der senkrechten Asymptote kommt sie von unten und geht nach unten. Dabei bleibt sie immer unterhalb der Asymptote:'
              : null}
            {data.c % 2 === -1
              ? 'Diese Funktion hat einen ungeraden Grad. Sie nimmt alle Werte an, bis auf den der Asymptote:'
              : null}
            <br />
            <HighlightGreen>
              W = {'{'} y |
              {data.a > 0 && data.c % 2 === 0 ? ' y > ' + data.d : null}
              {data.a < 0 && data.c % 2 === 0 ? ' y < ' + data.d : null}
              {data.c % 2 !== 0 ? ' y ≠ ' : null}
              {data.c % 2 !== 0 ? data.d : null}
              {' }'}
            </HighlightGreen>
            <br />
            <br />
            Graph für -6 &#8804; x &#8804; 6 und -6 &#8804; y &#8804; 6 als
            Hilfe:
            <br />
            <SubComponent data={data} />
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderHint={({ data }) => {
        return (
          <>
            Der <strong>Definitionsbereich</strong> einer Funktion der Form
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
            ist immer die Menge aller reellen Zahlen außer der Stelle b.
            <br />
            Die <strong>Asymptoten</strong> haben immer die Gleichungen:
            <br />
            <HighlightGray>y = d, x = b</HighlightGray>
            <br />
            <br />
            Der <strong>Wertebereich</strong> ist abhängig vom Grad und der
            Verschiebung in y-Richtung.
          </>
        )
      }}
    />
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SubComponent({ data }: { data: PlotData }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)
  useEffect(() => {
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
        const nenner = Math.pow(x + data.b, data.c)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return data.a * nenner + data.d
      },
      -6,
      6,
    ])
    setBoard(x)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <div
        id="jxgbox"
        className="jxgbox pointer-events-none mb-2 mt-6 h-[300px] w-[300px] rounded-2xl border border-gray-200"
      ></div>
      <style jsx global>
        {`
          .JXGtext {
            font-family: Karla, sans-serif !important;
            font-weight: bold !important;
            font-size: 18px !important;
          }
        `}
      </style>
    </div>
  )
}
