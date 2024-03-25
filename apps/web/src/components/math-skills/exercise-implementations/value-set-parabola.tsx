/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

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
            <h2 className="text-2xl">Bestimme die Wertemenge der Parabel:</h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = {data.a ? null : '-'} x<sup>2</sup> + bx + c
            </span>
            <br />
            <br />
            Der Scheitelpunkt der Parabel ist gegeben durch:{' '}
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              S({data.b}|{data.c})
            </span>
            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
          </>
        )
      }}
      renderSolution={({ data }) => {
        if (data.b < 0 || data.c < 0 || data.b === 0 || data.c === 0)
          return (
            <>
              Gesucht ist die Wertemenge der Parabel: <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = {data.a ? null : '-'} x<sup>2</sup> + bx + c
              </span>
              <br />
              <br />
              Da die Parabel nach {data.a === true ? 'oben' : 'unten'} geöfnet
              ist, ist der Wertebereich die Menge der reellen Zahlen{' '}
              <strong>{data.a === true ? 'oberhalb' : 'unterhalb'}</strong> des
              Scheitels:
              <br />
              <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                W = {'{'} y | y {data.a === true ? '≥' : '≤'}{' '}
                {data.c > 0 && data.c !== 0 ? data.c : '- ' + -data.c} {'}'}
              </span>
              <br />
              <br />
              Graph für -10 &#8804; x &#8804; 10 und -10 &#8804; y &#8804; 10
              als Hilfe:
              <br />
              <SubComponent data={data} />
            </>
          )
        if (data.b > 0 && data.c > 0)
          return (
            <>
              Wertemenge der Parabel: <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = {data.a ? null : '-'} x<sup>2</sup> + bx + c
              </span>
              <br />
              <br />
              Wir schreiben die Parabel in der Scheitelpunktform:
              <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = {data.a ? null : '-'} (x - {data.b < 0 ? '(' : null}
                {data.b}
                {data.b < 0 ? ')' : null})<sup>2</sup> +{' '}
                {data.c < 0 ? '(' : null}
                {data.c}
                {data.c < 0 ? ')' : null}
              </span>
              <br />
              <br />
              Da die Parabel nach {data.a === true ? 'oben' : 'unten'} geöfnet
              ist, ist der Wertebereich die Menge der reellen Zahlen{' '}
              {data.a === true ? 'oberhalb' : 'unterhalb'} des Scheitels:
              <br />
              <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                W = {'{'} y | y {data.a === true ? '≥' : '≤'}{' '}
                {data.c > 0 && data.c !== 0 ? data.c : '- ' + -data.c} {'}'}
              </span>
            </>
          )
        return <></>
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ data }) => {
        return (
          <>
            Für den Wertebereich untersuchen wir den Öffnungsfaktor und den
            y-Wert des Scheitel der Parabel:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y =
            </span>
            <span className="mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3 text-2xl">
              {data.a ? '1 · ' : '(-1) · '}{' '}
            </span>
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              (x {data.b > 0 && data.b !== 0 ? '- ' + data.b : '+ ' + -data.b})
              <sup>2</sup>{' '}
            </span>
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
      centAmount={35}
    />
  ) // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function SubComponent({ data }: { data: PlotData }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [board, setBoard] = useState<ReturnType<
      typeof JXG.JSXGraph.initBoard
    > | null>(null)
    useEffect(() => {
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
}
