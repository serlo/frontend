/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'

// JXG.Options.label.autoPosition = true

export function Trigonometry() {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-5, 5, 5, -5],
      showNavigation: false,
      showCopyright: false,
    })

    const pointS = b.create('point', [-4, -3], { name: 'S', fixed: true })
    const pointB = b.create('point', [-2.4, -0.4], { name: 'B', fixed: true })
    const pointD = b.create('point', [0, 3.5], { name: 'D', fixed: true })
    const pointA = b.create('point', [-0.8, -3.4], { name: 'A', fixed: true })
    const pointC = b.create('point', [4, -4], { name: 'C', fixed: true })

    const lineAB = b.create('line', [pointA, pointB])
    const lineCD = b.create('parallel', [lineAB, pointD])

    const lineSC = b.create('line', [pointS, pointC], {
      straightFirst: false,
      straightLast: true,
    })
    const lineSD = b.create('line', [pointS, pointD], {
      straightFirst: false,
      straightLast: true,
    })

    const angle = b.create('angle', [pointB, pointA, pointS], {
      radius: 1,
      name: function () {
        return (
          JXG.Math.Geometry.trueAngle(pointB, pointA, pointS).toFixed(1) + '°'
        )
      },
    })

    setBoard(b)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SelfEvaluationExercise
      generator={() => {
        return { formula: <>log&#8202;₂(x²-9) - log&#8202;₂(x+3)</> }
      }}
      renderTask={({ formula }) => {
        return (
          <>
            <h2 className="text-2xl">
              Die beiden Geraden{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">AB</b> und{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">CD</b>{' '}
              sind zueinander parallel.
            </h2>
            <div
              id="jxgbox"
              className="jxgbox my-6 h-[300px] w-[300px] rounded-2xl border border-gray-200"
            ></div>
            <ol>
              <li className="text-2xl">
                1. Bereche die Länge der Strecke{' '}
                <b className="rounded-md bg-newgreen bg-opacity-20 p-1 overline">
                  CD
                </b>
                .
              </li>
              <li className="mt-12 text-2xl">
                2. Begründe warum gilt:{' '}
                <b className="rounded-md bg-newgreen bg-opacity-20 p-1">
                  |<span className="overline">SB</span>| = √
                  <span className="pl-1 overline">13cm</span>
                </b>
                .
              </li>
            </ol>
            <br />
            <br />
            <style jsx global>
              {`
                .JXGtext {
                  font-family: Karla, sans-serif !important;
                  font-weight: bold !important;
                  font-size: 18px !important;
                }
              `}
            </style>
          </>
        )
      }}
      renderSolution={({ formula }) => {
        return (
          <>
            Aufgabenstellung: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {formula}
            </span>
            <br />
            <br />
            Die Teile erweitern: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              log&#8202;₂((x+3)(x-3) / (x+3))
            </span>
            <br />
            <br />
            Ergebnis: <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              log&#8202;₂(x-3)
            </span>
          </>
        )
      }}
      centAmount={35}
    />
  )
}
