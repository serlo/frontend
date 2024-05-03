import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { autoResizeBoundingBox } from '../utils/auto-resize-bounding-box'
import { buildFrac, buildJSX, buildOverline } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
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
                {buildOverline('CD')} und der Höhe {pp(data.h)}&nbsp;cm.
              </p>
              <p className="serlo-main-task">
                Es gilt: |{buildOverline('AB')}| = {pp(data.a)} cm und |
                {buildOverline('CD')}| ={pp(data.c)} cm
              </p>
              {renderDiagram(data)}
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
                Es gilt: ∢BAD = {pp(data.alpha)}°
              </p>
              {renderDiagram(data)}
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
              {pp(data.A)} cm².
            </p>
            <p className="serlo-main-task">
              Es gilt: |{buildOverline('AB')}| = {pp(data.a)} cm und |
              {buildOverline('CD')}| ={pp(data.c)} cm
            </p>
            {renderDiagram(data)}
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
                {pp(data.A)} cm² = {buildFrac(1, 2)} · ({pp(data.a)} cm +{' '}
                {pp(data.c)} cm) · h
              </p>
              <p>Stelle die Formel nach h um:</p>
              <p className="serlo-highlight-gray">
                h ={' '}
                {buildFrac(
                  <>{pp(data.A)} cm²</>,
                  <>
                    {pp(data.a)} cm + {pp(data.c)} cm
                  </>
                )}{' '}
                · 2
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                h = {pp(roundToDigits((data.A / (data.a + data.c)) * 2, 2))} cm
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
                ∢CBA = ∢BAD = {pp(data.alpha)}°
              </p>
              <p>Anliegende Winkel im Trapez ergänzen sich zu 180°:</p>
              <p className="serlo-highlight-gray">∢DCB = 180° - ∢CBA</p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                ∢DCB = {pp(180 - data.alpha)}°
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
              A<sub>Trapez</sub> = {buildFrac(1, 2)} · ({pp(data.a)} cm +{' '}
              {pp(data.c)} cm) · {pp(data.h)} cm
            </p>
            <p>Berechne das Ergebnis:</p>
            <p className="serlo-highlight-green">
              A<sub>Trapez</sub> ={' '}
              {pp(roundToDigits(0.5 * (data.a + data.c) * data.h, 2))} cm²
            </p>
          </>
        )
      }}
    />
  )
}

function renderDiagram(data: DATA) {
  const B_x = data.a
  const B_y = 0
  const [D_x, D_y] = rotatePoint(data.d, 0, -data.alpha)
  const C_x = D_x + data.c
  const C_y = D_y

  const boundingbox = autoResizeBoundingBox([
    [0, 0],
    [B_x, B_y],
    [C_x, C_y],
    [D_x, D_y],
  ])

  const dim = boundingbox[2] - boundingbox[0]

  return buildJSX(() => {
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

    return b
  }, data)
}
