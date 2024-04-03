import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { MainTask, HighlightGray } from '../components/content-components'
import { buildBlock, buildFrac, buildOverline } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

interface Trig1Data {
  as: number
  ac: number
  ab: number
  cd: number
  mode: 'cd' | 'ab'
  otherRay: boolean
  factor: number
}

export function Trigonometry1() {
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
          cd: ((as + ac) / as) * ab,
          mode: randomItemFromArray(['cd', 'ab']),
          otherRay: randomItemFromArray([true, false]),
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <MainTask>
              Die beiden Geraden{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">AB</b> und{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">CD</b>{' '}
              sind zueinander parallel.
            </MainTask>
            <p className="mt-2 text-2xl">
              Es gilt |{buildOverline(data.otherRay ? 'SB' : 'SA')}| = {data.as}{' '}
              cm² und |{buildOverline(data.otherRay ? 'BD' : 'AB')}| = {data.ac}{' '}
              cm² <br /> sowie |
              {buildOverline(data.mode === 'cd' ? 'AB' : 'CD')}| ={' '}
              {data.mode === 'cd' ? data.ab : data.cd} cm².
            </p>
            <SubComponent data={data} />
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <p className="text-2xl">
              Berechnen Sie die Länge der Strecke{' '}
              <b className="rounded-md bg-newgreen bg-opacity-20 p-1 overline">
                {data.mode.toUpperCase()}
              </b>
              .
            </p>
            <br />
            <br />
          </>
        )
      }}
      renderSolution={({ data }) => {
        return (
          <>
            Stelle eine Gleichung mit dem Strahlensatz auf:
            <br />
            {data.mode === 'cd' ? (
              <HighlightGray>
                {buildFrac(
                  <>
                    |<span className="overline">CD</span>|
                  </>,
                  <>{data.ab} cm</>
                )}{' '}
                = {buildFrac(<>{data.as + data.ac} cm</>, <>{data.as} cm</>)}
              </HighlightGray>
            ) : (
              buildBlock(
                'gray',
                <>
                  {buildFrac(
                    <>
                      |<span className="overline">AB</span>|
                    </>,
                    <>{data.cd} cm</>
                  )}{' '}
                  = {buildFrac(<>{data.as} cm</>, <>{data.as + data.ac} cm</>)}
                </>
              )
            )}
            <br />
            <br />
            Forme die Gleichung nach |<span className="overline">CD</span>| um:{' '}
            <br />
            {data.mode === 'cd' ? (
              <HighlightGray>
                ⇔ |<span className="overline">CD</span>| ={' '}
                {buildFrac(<>{data.as + data.ac} cm</>, <>{data.as} cm</>)} ·{' '}
                {data.ab} cm
              </HighlightGray>
            ) : (
              buildBlock(
                'gray',
                <>
                  ⇔ |<span className="overline">CD</span>| ={' '}
                  {buildFrac(<>{data.as} cm</>, <>{data.as + data.ac} cm</>)} ·{' '}
                  {data.cd} cm
                </>
              )
            )}
            <br />
            <br />
            Ergebnis: <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              |<span className="overline">CD</span>| ={' '}
              {(data.mode === 'cd' ? data.cd : data.ab)
                .toString()
                .replace('.', ',')}{' '}
              cm
            </span>
            <br />
            <br />
          </>
        )
      }}
      renderHint={({ data }) => {
        return (
          <>
            Verwende den Strahlensatz, um eine Gleichung aufzustellen:
            <br />
            <HighlightGray>
              {buildFrac(
                <>
                  |<span className="overline">CD</span>|
                </>,
                <>
                  |<span className="overline">AB</span>|
                </>
              )}{' '}
              ={' '}
              {buildFrac(
                <>
                  |
                  <span className="overline">
                    {data.otherRay ? 'DS' : 'CS'}
                  </span>
                  |{' '}
                </>,
                <>
                  |
                  <span className="overline">
                    {data.otherRay ? 'BS' : 'AS'}
                  </span>
                  |
                </>
              )}
            </HighlightGray>
            <br />
            <br />
            Setze die Werte der Längen ein und löse die Gleichung.
          </>
        )
      }}
      centAmount={52}
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

    b.create('line', [pointA, pointB])
    b.create('line', [pointC, pointD])

    b.create('line', [pointS, pointC], {
      straightFirst: false,
      straightLast: true,
    })
    b.create('line', [pointS, pointD], {
      straightFirst: false,
      straightLast: true,
    })

    if (data.otherRay) {
      b.create('text', [0, 2, `${data.as} cm`], {})
      setBoard(b)

      b.create('text', [1.6, 3.8, `${data.ac} cm`], {})
      setBoard(b)
    } else {
      b.create('text', [2, 0, `${data.as} cm`], {
        anchorX: 'middle',
        anchorY: 'top',
      })
      b.create('text', [5.3, 0, `${data.ac} cm`], {
        anchorX: 'middle',
        anchorY: 'top',
      })
    }

    if (data.mode === 'cd') {
      b.create('text', [2.8, 2, `${data.ab} cm`], {})
      setBoard(b)
    } else {
      b.create('text', [4.6, 2.4, `${data.cd} cm`], {})
      setBoard(b)
    }

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
