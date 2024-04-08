import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  MainTask,
  HighlightGray,
  HighlightGreen,
} from '../components/content-components'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

interface Trig1Data {
  as: number
  ac: number
  bd: number
  ab: number
  angle: number
  factor: number
  sb_sq: number
}

export function Trigonometry2() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const factor = randomItemFromArray([0.5, 1])
        const as = randomIntBetween(1, 10) * 2
        const ac = as * factor
        const ab = randomIntBetween(6, 12)
        const bd = randomIntBetween(2, 5)
        const data: Trig1Data = {
          factor,
          as,
          ac,
          bd,
          ab,
          angle: 104,
          sb_sq: as * as + ab * ab - 2 * as * ab * 0.5,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <MainTask>
              Gegeben ist das gleichschenklige Dreieck{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">ABC</b>.{' '}
              <br />
              Es gilt{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">
                <span className="overline">BD</span> = {data.bd} cm
              </b>
              .
            </MainTask>
            <SubComponent data={data} />
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <p className="mt-12 text-2xl">Berechnen Sie, den Winkel für 𝛼.</p>
            <br />
            <br />
          </>
        )
      }}
      renderSolution={({ data }) => {
        const zw = data.ab / data.bd
        const rzw = Math.round(zw * 100) / 100
        const rad = 38 * (Math.PI / 180)
        const zw2 = Math.sin(rad) / (zw - Math.cos(rad))

        const Erg0 = Math.atan(zw2)
        const Erg = Math.round(Erg0 * (180 / Math.PI) * 100) / 100

        return (
          <>
            Wende den Sinussatz an:
            <br />
            <HighlightGray>
              {buildFrac(<>{data.bd} cm</>, <>sin(𝛼)</>)} ={' '}
              {buildFrac(<>{data.ab} cm</>, <>sin[180° - (𝛼 + 38°)]</>)}
            </HighlightGray>
            <br />
            <HighlightGray>
              {data.ab} cm ={' '}
              {buildFrac(<>{data.bd} · sin(𝛼 + 38°)</>, <>sin 𝛼</>)} cm
              &nbsp;&nbsp; | · sin 𝛼
            </HighlightGray>
            <br />
            <HighlightGray>
              {data.ab} · sin 𝛼 = {data.bd} · (sin 𝛼 cos 38° + cos 𝛼 sin 38°)
              &nbsp;&nbsp; | : {data.bd}
            </HighlightGray>
            <br />
            <HighlightGray>
              {rzw.toLocaleString('de-DE')} · sin 𝛼 = sin 𝛼 cos 38° + cos 𝛼 sin
              38° &nbsp;&nbsp; | - sin 𝛼 cos 38°
            </HighlightGray>
            <br />
            <HighlightGray>
              {rzw.toLocaleString('de-DE')} · sin 𝛼 - sin 𝛼 cos 38° = cos 𝛼 sin
              38°
            </HighlightGray>
            <br />
            <HighlightGray>
              sin 𝛼 · ({rzw.toLocaleString('de-DE')} - cos 38°)= cos 𝛼 sin 38°{' '}
              <br /> | : cos 𝛼 : ({rzw.toLocaleString('de-DE')} - cos 38°)
            </HighlightGray>
            <br />
            <HighlightGray>
              tan 𝛼 ={' '}
              {buildFrac(
                <>sin 38°</>,
                <>{rzw.toLocaleString('de-DE')} - cos 38°</>
              )}{' '}
              mit tan 𝛼 = {buildFrac(<>sin 𝛼</>, <>cos 𝛼</>)}
            </HighlightGray>
            <br />
            <HighlightGreen>𝛼 = {Erg.toLocaleString('de-DE')}°</HighlightGreen>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({}) => {
        return (
          <>
            Verwende den Sinussatz:
            <br />
            <HighlightGray>
              {buildFrac(<>a</>, <>sin(𝛼)</>)} ={' '}
              {buildFrac(<>b</>, <>sin(𝛽)</>)} ={' '}
              {buildFrac(<>c</>, <>sin(𝛾)</>)}{' '}
            </HighlightGray>
            <br />
            Tipp: Versuche es mit: <br />
            <HighlightGray>
              a = {buildFrac(<>a · sin(𝛼 + 38°)</>, <>sin 𝛼</>)} cm &nbsp;&nbsp;
              | · sin 𝛼
            </HighlightGray>
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
      boundingbox: [-2, 6, 7, -2],
      showNavigation: false,
      showCopyright: false,
    })

    const pointA = b.create('point', [0, 0], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointB = b.create('point', [5.5, 0], { name: 'B', fixed: true })
    const pointC = b.create('point', [-1, 4.41], {
      name: 'C',
      fixed: true,
    })
    const pointD = b.create('point', [3.48, 1.37], { name: 'D', fixed: true })

    b.create('line', [pointA, pointD], {
      straightFirst: false,
      straightLast: false,
    })

    b.create('line', [pointA, pointB], {
      straightFirst: false,
      straightLast: false,
    })

    b.create('line', [pointC, pointB], {
      straightFirst: false,
      straightLast: false,
    })
    b.create('line', [pointC, pointA], {
      straightFirst: false,
      straightLast: false,
    })

    b.create('angle', [pointB, pointA, pointC], {
      radius: 0.75,
      name: function () {
        return `${data.angle}°`
      },
    })

    b.create('angle', [pointB, pointA, pointD], {
      type: 'sector',
      name: ' ',
      color: 'blue',
      radius: 1.5,
    })

    b.create('text', [2.5, 0, `${data.ab} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [-1, 1.5, `${data.ab} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [2, 0.75, `𝛼`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [4.8, 1.2, `${data.bd} cm`], {})
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
