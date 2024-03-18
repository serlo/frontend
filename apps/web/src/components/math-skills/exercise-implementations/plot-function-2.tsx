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

export function PlotFunction2() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-2, -1, 2, 0.5])

        const b = randomItemFromArray([2, 3, 0.5, 0.25, 123])

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
            <h2 className="text-2xl">Skizziere den Graphen der Funktion:</h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = {data.a === -1 ? '-' : data.a.toString().replace('.', ',')}{' '}
              {data.a === -1 ? null : '·'}{' '}
              {data.b === 123 ? 'e' : data.b.toString().replace('.', ',')}
              <sup>x</sup> {data.c > 0 ? '+' : null}{' '}
              {data.c !== 0 ? data.c : null}
            </span>
            <br />
            <br />
            <i>
              Lege dafür ein Koordinatensystem mit -6 &#8804; x &#8804; 6 und -6
              &#8804; y &#8804; 6 an.
            </i>
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderSolution={({ data }) => {
        return (
          <>
            Skizziere den Graphen der Funktion:
            <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = {data.a === -1 ? '-' : data.a.toString().replace('.', ',')}{' '}
              {data.a === -1 ? null : '·'}{' '}
              {data.b === 123 ? 'e' : data.b.toString().replace('.', ',')}
              <sup>x</sup> {data.c > 0 ? '+' : null}{' '}
              {data.c !== 0 ? data.c : null}
            </span>
            <br />
            <br />
            Graph für -6 &#8804; x &#8804; 6 und -6 &#8804; y &#8804; 6:
            <br />
            <SubComponent data={data} />
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderHint={({ data }) => {
        return (
          <>
            Die Exponentialfunktion hat die Form:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = a · b<sup>x</sup> + c
            </span>
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
