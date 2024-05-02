import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { MainTask } from '../components/content-components'
import { buildFrac, buildOverline } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { roundToDigits } from '../utils/round-to-digits'
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
              Es gilt |<span className="overline">BD</span>| = {data.bd} cm; |
              <span className="overline">AB</span>| = |
              <span className="overline">AC</span>| = {data.ab} cm und ∢ACB ={' '}
              {(180 - data.angle) / 2}°
            </MainTask>
            <SubComponent data={data} />
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <p className="mt-12 text-2xl">
              Berechnen Sie die Größe des Winkel 𝛼.
            </p>
            <p className="mt-3">Runden Sie auf zwei Stellen nach dem Komma.</p>
          </>
        )
      }}
      renderSolution={({ data }) => {
        const ad = roundToDigits(
          Math.sqrt(
            data.ab * data.ab +
              data.bd * data.bd -
              2 * data.ab * data.bd * Math.cos((38 / 180) * Math.PI)
          ),
          2
        )

        const Erg = roundToDigits(
          (Math.asin((Math.sin((38 / 180) * Math.PI) / ad) * data.bd) /
            Math.PI) *
            180,
          2
        )

        return (
          <>
            <p>
              Das Dreieck ABC ist gleichschenklig, daher ist der Winkel ∢DBA =
              38°. Wende den Kosinussatz mit {buildOverline('AB')} und{' '}
              {buildOverline('BD')} an:
            </p>
            <p className="serlo-highlight-gray">
              |{buildOverline('AD')}|² = (4 cm)² + (6 cm)² - 2 · 4 cm · 6 cm ·
              cos 38°
              <br />
              <br />|{buildOverline('AD')}| = {pp(ad)} cm
            </p>
            <p>Nutze den Sinussatz im Dreieck ABD:</p>
            <p className="serlo-highlight-gray">
              {buildFrac(<>sin(𝛼)</>, <>|{buildOverline('BD')}|</>)} ={' '}
              {buildFrac(<>sin 38°</>, <>|{buildOverline('AD')}|</>)}
            </p>
            <p>Stelle die Gleichung um und setze gegebene Größen ein:</p>
            <p className="serlo-highlight-gray">
              sin(𝛼) = {buildFrac(<>sin 38°</>, <>{pp(ad)} cm</>)} · {data.bd}{' '}
              cm
            </p>
            <p>Berechne das Ergebnis:</p>
            <p className="serlo-highlight-green">𝛼 = {pp(Erg)}°</p>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({}) => {
        return (
          <>
            <p>Nutze die Eigenschaft, dass ABC gleichschenklig ist.</p>
            <p className="mt-3">
              Es ist hilfreich, zuerst die Länge der Strecke{' '}
              {buildOverline('AD')} zu berechnen.
            </p>
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

    b.create('angle', [pointA, pointC, pointB], {
      radius: 0.75,
      name: function () {
        return `${(180 - data.angle) / 2}°`
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
