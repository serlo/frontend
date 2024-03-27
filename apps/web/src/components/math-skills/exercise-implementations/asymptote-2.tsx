import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

/* eslint-disable no-empty-pattern */
import { SelfEvaluationExercise } from './self-evaluation-exercise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
}

export function Asymptote2() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-2, -1, 2, 0.5])

        const b = randomItemFromArray([2, 3, 0.5, 0.25, 2.718])

        const c = randomIntBetween(-2, 2)
        const data: PlotData = {
          a,
          b,
          c,
        }
        return { data }
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTask={({ data }) => {
        return (
          <>
            <h2 className="text-2xl">
              Bestimme die Definitions-, Wertemenge und Asymptote der Funktion:
            </h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = {data.a === -1 ? '-' : data.a.toString().replace('.', ',')}{' '}
              {data.a === -1 ? null : '·'}{' '}
              {data.b === 2.718 ? 'e' : data.b.toString().replace('.', ',')}
              <sup>x</sup> {data.c > 0 ? '+' : null}{' '}
              {data.c !== 0 ? data.c : null}
            </span>
            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
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
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = {data.a === -1 ? '-' : data.a.toString().replace('.', ',')}{' '}
              {data.a === -1 ? null : '·'}{' '}
              {data.b === 2.718 ? 'e' : data.b.toString().replace('.', ',')}
              <sup>x</sup> {data.c > 0 ? '+' : null}{' '}
              {data.c !== 0 ? data.c : null}
            </span>
            <br />
            <br />
            Die Definitionsmenge ist bei allen Exponentialfunktionen die Menge
            der reellen Zahlen.
            <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              D = R
            </span>
            <br />
            <br />
            Der Graph hat eine Asymptote mit der Gleichung:
            <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = {data.c}
            </span>
            <br />
            <br />
            Der Wertebereich setzt sich aus allen Werten{' '}
            {data.a > 0 ? 'oberhalb' : 'unterhalb'} der Asymptote zusammen (der
            Faktor der Funktion ist {data.a > 0 ? 'positiv' : 'negativ'}):
            <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              W = {'{'} y |{data.a > 0 ? ' y > ' + data.c : ' y < ' + data.c}
              {'}'}
            </span>
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
            Der <strong>Definitionsbereich</strong> einer Exponentialfunktion
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = a · b<sup>x</sup> + c
            </span>
            <br />
            <br />
            ist immer die Menge der reellen Zahlen.
            <br />
            Die <strong>Asyptote</strong> hat immer die Gleichung:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = c
            </span>
            <br />
            <br />
            Die Asymptote bildet die Grenze zum <strong>Wertebereich</strong>.
            Abhängig davon, ob a positiv oder negativ ist, sind alle Werte
            darüber oder darunter der Wertebereich.
          </>
        )
      }}
      centAmount={35}
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return data.a * Math.pow(data.b, x) + data.c
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
