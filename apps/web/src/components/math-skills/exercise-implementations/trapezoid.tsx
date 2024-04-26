import { useState, useEffect } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { autoResizeBoundingBox } from '../utils/auto-resize-bounding-box'
import { JSXGraphWrapper } from '../utils/jsx-graph-wrapper'
import { buildFrac, buildOverline } from '../utils/math-builder'
import { rotatePoint } from '../utils/rotate-point'
import { roundToDigits } from '../utils/round-to-digits'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  h: number
  alpha: number
  beta: number
  gamma: number
  delta: number
  A: number
  isEqualSided: boolean
  mode: string
}

export function Trapezoid() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const mode = randomItemFromArray(['area', 'area_inv', 'angle'])
        const a = randomIntBetween(21, 110) / 10
        const c = randomIntBetween(21, 69) / 10
        const h = randomIntBetween(9, 80) / 10
        const isEqualSided =
          mode === 'angle' || randomItemFromArray([true, false, false])
        const alpha = isEqualSided
          ? c < a
            ? (Math.atan(h / ((a - c) / 2)) / Math.PI) * 180
            : 180 - (Math.atan(h / ((c - a) / 2)) / Math.PI) * 180
          : randomIntBetween(50, 119)
        return {
          mode,
          a,
          c,
          h,
          alpha: roundToDigits(alpha, 0),
          d: h / Math.sin((alpha / 180) * Math.PI),
          A: roundToDigits(0.5 * (a + c) * h, 1),
        } as DATA
      }}
      renderTask={(data) => {
        if (data.mode === 'area') {
          return (
            <>
              <p className="serlo-main-task">
                Gegeben sei das Trapez ABCD mit {buildOverline('AB')} ||{' '}
                {buildOverline('CD')} und der Höhe{' '}
                {data.h.toLocaleString('de-De')}&nbsp;cm.
              </p>
              <p className="serlo-main-task">
                Es gilt: |{buildOverline('AB')}| ={' '}
                {data.a.toLocaleString('de-De')} cm und |{buildOverline('CD')}|
                ={data.c.toLocaleString('de-De')} cm
              </p>
              <SubComponent data={data} />
              <p className="serlo-main-task">
                Berechnen Sie den <strong>Flächeninhalt</strong> des Trapez.
              </p>
              <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
            </>
          )
        }
        if (data.mode === 'angle') {
          return (
            <>
              <p className="serlo-main-task">
                Gegeben sei das gleichschenklige Trapez ABCD mit{' '}
                {buildOverline('AB')} || {buildOverline('CD')}.
              </p>
              <p className="serlo-main-task">
                Es gilt: ∢BAD = {data.alpha.toLocaleString('de-De')}°
              </p>
              <SubComponent data={data} />
              <p className="serlo-main-task">
                Berechnen Sie die Größe <strong>des Winkels ∢DCB</strong>.
              </p>
              <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
            </>
          )
        }
        return (
          <>
            <p className="serlo-main-task">
              Gegeben sei das Trapez ABCD mit {buildOverline('AB')} ||{' '}
              {buildOverline('CD')} und dem Flächeninhalt A<sub>Trapez</sub> ={' '}
              {data.A.toLocaleString('de-De')} cm².
            </p>
            <p className="serlo-main-task">
              Es gilt: |{buildOverline('AB')}| ={' '}
              {data.a.toLocaleString('de-De')} cm und |{buildOverline('CD')}| =
              {data.c.toLocaleString('de-De')} cm
            </p>
            <SubComponent data={data} />
            <p className="serlo-main-task">
              Berechnen Sie die <strong>Höhe</strong> des Trapez.
            </p>
            <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
          </>
        )
      }}
      renderSolution={(data) => {
        if (data.mode === 'area_inv') {
          return (
            <>
              <p>Stelle mit den gegebenen Größen eine Formel auf:</p>
              <p className="serlo-highlight-gray">
                {data.A.toLocaleString('de-De')} cm² = {buildFrac(1, 2)} · (
                {data.a.toLocaleString('de-De')} cm +{' '}
                {data.c.toLocaleString('de-De')} cm) · h
              </p>
              <p>Stelle die Formel nach h um:</p>
              <p className="serlo-highlight-gray">
                h ={' '}
                {buildFrac(
                  <>{data.A.toLocaleString('de-De')} cm²</>,
                  <>
                    {data.a.toLocaleString('de-De')} cm +{' '}
                    {data.c.toLocaleString('de-De')} cm
                  </>
                )}{' '}
                · 2
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                h ={' '}
                {roundToDigits(
                  (data.A / (data.a + data.c)) * 2,
                  2
                ).toLocaleString('de-De')}{' '}
                cm
              </p>
            </>
          )
        }
        if (data.mode === 'angle') {
          return (
            <>
              <p>
                Das Trapez ist gleichschenklig, gegenüberliegende Winkel haben
                die gleiche Größe. Daraus folgt:
              </p>
              <p className="serlo-highlight-gray">
                ∢CBA = ∢BAD = {data.alpha.toLocaleString('de-De')}°
              </p>
              <p>Anliegende Winkel im Trapez ergänzen sich zu 180°:</p>
              <p className="serlo-highlight-gray">∢DCB = 180° - ∢CBA</p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                ∢DCB = {(180 - data.alpha).toLocaleString('de-De')}°
              </p>
            </>
          )
        }
        return (
          <>
            <p>Stelle die Formel auf:</p>
            <p className="serlo-highlight-gray">
              A<sub>Trapez</sub> = {buildFrac(1, 2)} · (|{buildOverline('AB')}|
              + |{buildOverline('CD')}|) · h
            </p>
            <p>Setze passende Werte ein:</p>
            <p className="serlo-highlight-gray">
              A<sub>Trapez</sub> = {buildFrac(1, 2)} · (
              {data.a.toLocaleString('de-De')} cm +{' '}
              {data.c.toLocaleString('de-De')} cm) ·{' '}
              {data.h.toLocaleString('de-De')} cm
            </p>
            <p>Berechne das Ergebnis:</p>
            <p className="serlo-highlight-green">
              A<sub>Trapez</sub> ={' '}
              {roundToDigits(
                0.5 * (data.a + data.c) * data.h,
                2
              ).toLocaleString('de-De')}{' '}
              cm²
            </p>
          </>
        )
      }}
    />
  )
}

function SubComponent({ data }: { data: DATA }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  const B_x = data.a
  const B_y = 0
  const [D_x, D_y] = rotatePoint(data.d, 0, -data.alpha)
  const C_x = D_x + data.c
  const C_y = D_y

  const boundingbox = autoResizeBoundingBox([
    { x: 0, y: 0 },
    { x: B_x, y: B_y },
    { x: C_x, y: C_y },
    { x: D_x, y: D_y },
  ])

  const dim = boundingbox[2] - boundingbox[0]

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox,
      showNavigation: false,
      showCopyright: false,
    })

    const A = b.create('point', [0, 0], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })

    const B = b.create('point', [B_x, B_y], {
      name: 'B',
      fixed: true,
      label: { autoPosition: true },
    })

    const C = b.create('point', [C_x, C_y], {
      name: 'C',
      fixed: true,
      label: { autoPosition: true },
    })

    const D = b.create('point', [D_x, D_y], {
      name: 'D',
      fixed: true,
      label: { autoPosition: true },
    })

    b.create('segment', [A, B])
    b.create('segment', [B, C])
    b.create('segment', [C, D])
    b.create('segment', [D, A])

    if (data.mode === 'angle') {
      b.create('angle', [B, A, D], { withLabel: false, radius: dim * 0.1 })
      b.create('angle', [D, C, B], {
        withLabel: false,
        radius: dim * 0.1,
        fillColor: 'rgb(47 206 177)',
        strokeColor: 'rgb(47 206 177)',
      })
    }

    setBoard(b)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <JSXGraphWrapper id="jxgbox" width={300} height={300} />
}
