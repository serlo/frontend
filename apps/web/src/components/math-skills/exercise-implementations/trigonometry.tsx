import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac, buildSqrt } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

interface Trig1Data {
  as: number
  ac: number
  ab: number
  angle: number
  factor: number
  sb_sq: number
}

export function Trigonometry() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const factor = randomItemFromArray([0.5, 1])
        const as = randomIntBetween(1, 10) * 2
        const ac = as * factor
        const ab = randomIntBetween(2, 10)
        const data: Trig1Data = {
          factor,
          as,
          ac,
          ab,
          angle: 60,
          sb_sq: as * as + ab * ab - 2 * as * ab * 0.5,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <h2 className="text-2xl">
              Die beiden Geraden{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">AB</b> und{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">CD</b>{' '}
              sind zueinander parallel.
            </h2>
            <SubComponent data={data} />
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
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
                  |<span className="overline">SB</span>| ={' '}
                  {buildSqrt(<>{data.sb_sq}</>)} cm
                </b>
                .
              </li>
            </ol>
            <br />
            <br />
          </>
        )
      }}
      renderSolution={({ data }) => {
        return (
          <>
            <strong>Teilaufgabe 1</strong>
            <br />
            Stelle eine Gleichung mit dem Strahlensatz auf:
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {buildFrac(
                <>
                  |<span className="overline">CD</span>|
                </>,
                <>{data.ab} cm</>
              )}{' '}
              = {buildFrac(<>{data.as + data.ac} cm</>, <>{data.as} cm</>)}
            </span>
            <br />
            <br />
            Forme die Gleichung nach |<span className="overline">CD</span>| um:{' '}
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              ⇔ |<span className="overline">CD</span>| ={' '}
              {buildFrac(<>{data.as + data.ac} cm</>, <>{data.as} cm</>)} ·{' '}
              {data.ab} cm
            </span>
            <br />
            <br />
            Ergebnis: <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              |<span className="overline">CD</span>| ={' '}
              {(((data.as + data.ac) / data.as) * data.ab)
                .toString()
                .replace('.', ',')}{' '}
              cm
            </span>
            <br />
            <br />
            <strong>Teilaufgabe 2</strong>
            <br />
            Wende den Kosinussatz an:
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              |<span className="overline">SB</span>|² = ({data.as} cm)² + (
              {data.ab} cm)²
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              2 · {data.as} cm · {data.ab} cm · cos 60°
            </span>
            <br />
            <br />
            Nutze cos 60° = 0,5 und berechne:
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              |<span className="overline">SB</span>|² ={' '}
              {data.as * data.as + data.ab * data.ab} cm² -{' '}
              {2 * data.as * data.ab} cm²
            </span>
            <br />
            <br />
            Ziehe die Wurzel. Das Ergebnis ist bestätigt.
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              |<span className="overline">SB</span>| ={' '}
              {buildSqrt(<>{data.sb_sq}</>)} cm
            </span>
            <br />
            <br />
          </>
        )
      }}
      centAmount={35}
    />
  )
}

function SubComponent({ data }: { data: Trig1Data }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-1, 6, 7, -2],
      showNavigation: false,
      showCopyright: false,
    })

    const pointS = b.create('point', [0, 0], {
      name: 'S',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointA = b.create('point', [4, 0], { name: 'A', fixed: true })
    const pointC = b.create('point', [6, 0], { name: 'C', fixed: true })
    const pointB = b.create('point', [2.1, 2.7], {
      name: 'B',
      fixed: true,
    })
    const pointD = b.create(
      'point',
      [() => pointB.X() * 1.5, () => pointB.Y() * 1.5],
      {
        name: 'D',
        fixed: true,
      }
    )

    const lineAB = b.create('line', [pointA, pointB])
    b.create('parallel', [lineAB, pointD])

    b.create('line', [pointS, pointC], {
      straightFirst: false,
      straightLast: true,
    })
    b.create('line', [pointS, pointD], {
      straightFirst: false,
      straightLast: true,
    })

    b.create('angle', [pointB, pointA, pointS], {
      radius: 1,
      name: function () {
        return `${data.angle}°`
      },
    })

    b.create('text', [2, 0, `${data.as} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })
    b.create('text', [5.3, 0, `${data.ac} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [2.8, 2, `${data.ab} cm`], {})
    setBoard(b)

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
