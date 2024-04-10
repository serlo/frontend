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
  bc: number
  ab: number
  factor1: number
  factor2: number
  angle: number
  sb_sq: number
}

export function Trigonometry3() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        //siehe S. 146/6
        const factor1 = randomItemFromArray([0.61, 0.79])
        const factor2 = randomItemFromArray([0.48, 0.6])
        const as = randomIntBetween(1, 10) * 2
        const ab = randomIntBetween(6, 12)
        const ac = Math.round(ab * factor1 * 10) / 10
        const bc = Math.round(ab * factor2 * 10) / 10
        const data: Trig1Data = {
          as,
          ac,
          bc,
          ab,
          factor1,
          factor2,
          angle: 104,
          sb_sq: as * as + ab * ab - 2 * as * ab * 0.5,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <MainTask>
              Gegeben ist das Dreieck{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">ABC</b>.{' '}
            </MainTask>
            <SubComponent data={data} />
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <p className="mt-12 text-2xl">
              Die Seiten{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">
                <span className="overline">AB</span>
              </b>
              &nbsp;und&nbsp;
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">
                <span className="overline">AC</span>
              </b>
              &nbsp; des Dreiecks werden jeweils um ein Achtel ihrer Länge auf
              die Seiten&nbsp;
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">
                <span className="overline">AD</span>
              </b>
              &nbsp;und&nbsp;
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">
                <span className="overline">AE</span>
              </b>
              &nbsp; verkürzt. <br /> <br />
              Berechnen Sie den Flächeninhalt des Vierecks DBCE.
            </p>
            <br />
            <br />
          </>
        )
      }}
      renderSolution={({ data }) => {
        const br =
          (Math.pow(data.ab, 2) + Math.pow(data.ac, 2) - Math.pow(data.bc, 2)) /
          (2 * data.ab * data.ac)

        const zw1 = Math.acos(br)
        const zw = Math.round(zw1 * (180 / Math.PI) * 100) / 100
        const achtelbd = Math.round(((data.ab * 1) / 8) * 100) / 100
        const achtelce = Math.round(((data.ac * 1) / 8) * 100) / 100
        const A1 =
          Math.round(0.5 * data.ab * data.ac * Math.sin(zw1) * 100) / 100

        const A2 =
          Math.round(
            0.5 *
              (data.ab - data.ab / 8) *
              (data.ac - data.ac / 8) *
              Math.sin(zw1) *
              100
          ) / 100
        const Erg = Math.round((A1 - A2) * 100) / 100
        return (
          <>
            Im Dreieck ABC gilt:
            <br />
            <HighlightGray>
              cos 𝛼 ={' '}
              {buildFrac(
                <>
                  ({data.ab} cm)² + ({data.ac} cm)² - ({data.bc} cm)²
                </>,
                <>
                  2 · {data.ab} cm · {data.ac} cm
                </>
              )}
            </HighlightGray>
            <br />
            <HighlightGray>𝛼 = {zw}.toLocaleString('de-DE')°</HighlightGray>
            <br />
            <HighlightGray>
              |<span className="overline">BD</span>| ={' '}
              {buildFrac(<>1</>, <>8</>)} · {data.ab} cm ={' '}
              {achtelbd.toLocaleString('de-DE')} cm
            </HighlightGray>{' '}
            <br />
            <HighlightGray>
              |<span className="overline">CE</span>| ={' '}
              {buildFrac(<>1</>, <>8</>)} · {data.ac} cm ={' '}
              {achtelce.toLocaleString('de-DE')} cm
            </HighlightGray>{' '}
            <br /> <br />
            So ist der Flächeninhalt des Dreiecks ABC: <br />
            <HighlightGray>
              A<sub>ABC</sub> = 0,5 · {data.ab} · {data.ac} · sin {zw}° = {A1}{' '}
              cm²
            </HighlightGray>{' '}
            <br /> <br />
            Der Flächeninhalt des Dreicks ADE: <br />
            <HighlightGray>
              A<sub>ADE</sub> = 0,5 · ({data.ab} - {data.ab / 8}) cm · (
              {data.ac} - {Math.round((data.ac / 8) * 100) / 100}) cm · sin{' '}
              {zw.toLocaleString('de-DE')}
              ° <br />= {A2} cm²
            </HighlightGray>{' '}
            <br /> <br />
            Somit ist der Flächeninhalt des Vierecks DBCE: <br />
            <HighlightGreen>
              A = {A1} cm² - {A2} cm² = {Erg.toLocaleString('de-DE')} cm²
            </HighlightGreen>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({}) => {
        return (
          <>
            Verwende den Kosinussatz:
            <br />
            <HighlightGray>
              cos 𝛼 ={' '}
              {buildFrac(
                <>
                  (|<span className="overline">AB</span>|)² + (|
                  <span className="overline">AC</span>|)² - (|
                  <span className="overline">BC</span>|)²
                </>,
                <>
                  2 · |<span className="overline">AB</span>| · |
                  <span className="overline">AC</span>|
                </>
              )}
            </HighlightGray>
          </>
        )
      }}
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

    const pointA = b.create('point', [-0.5, 0], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointB = b.create('point', [5.5, 0], { name: 'B', fixed: true })
    const pointC = b.create('point', [3.5, 4], {
      name: 'C',
      fixed: true,
    })
    const pointD = b.create('point', [4, 0], { name: 'D', fixed: true })

    const pointE = b.create('point', [2.5, 3], { name: '', fixed: true })

    b.create('line', [pointA, pointD], {
      straightFirst: false,
      straightLast: false,
    })
    b.create('line', [pointD, pointE], {
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

    b.create('text', [0.5, 2.5, `${data.ac} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [2.3, 4, `E`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [4.8, 2, `${data.bc} cm`], {})
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
