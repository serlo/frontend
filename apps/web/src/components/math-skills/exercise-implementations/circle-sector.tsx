import { useState, useEffect } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { JSXGraphWrapper } from '../utils/jsx-graph-wrapper'
import { buildBigSqrt, buildFrac, buildLatex } from '../utils/math-builder'
import { rotatePoint } from '../utils/rotate-point'
import { roundToDigits } from '../utils/round-to-digits'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

type Element = 'r' | 'alpha' | 'A' | 'b' | 'U'

interface Variant {
  given: [Element, Element]
  goal: Element
  method: string
}

interface DATA {
  variant: Variant
  angle: number
  values: { [key in Element]: number }
}

function elToGiven(e: Element, val: number) {
  if (e === 'r') {
    return <>den Radius {val.toLocaleString()}&nbsp;cm</>
  }
  if (e === 'alpha') {
    return <>einen Mittelpunktswinkel α&nbsp;=&nbsp;{val.toLocaleString()}°</>
  }
  if (e === 'U') {
    return <>einen Umfang von {val.toLocaleString()}&nbsp;cm</>
  }
  if (e === 'A') {
    return <>den Flächeninhalt {val.toLocaleString()}&nbsp;cm²</>
  }
  return (
    <>
      die Bogenlänge {buildLatex('\\overgroup{AC}')}&nbsp;=&nbsp;
      {val.toLocaleString()}&nbsp;cm
    </>
  )
}

const variants: Variant[] = [
  { given: ['alpha', 'r'], goal: 'A', method: 'area1' },
  { given: ['A', 'alpha'], goal: 'r', method: 'area2' },
  { given: ['A', 'r'], goal: 'alpha', method: 'area3' },

  { given: ['alpha', 'r'], goal: 'b', method: 'arc1' },
  { given: ['b', 'alpha'], goal: 'r', method: 'arc2' },
  { given: ['b', 'r'], goal: 'alpha', method: 'arc3' },

  { given: ['alpha', 'r'], goal: 'U', method: 'cir' },
]

export function CircleSector() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const variant = randomItemFromArray(variants)
        const alpha = randomIntBetween(35, 222)
        const r = randomIntBetween(119, 255) / 10
        const values: { [key in Element]: number } = {
          alpha,
          r,
          A: roundToDigits(Math.PI * r * r * (alpha / 360), 0),
          b: roundToDigits(Math.PI * r * 2 * (alpha / 360), 1),
          U: roundToDigits(Math.PI * r * 2 * (alpha / 360) + r + r, 1),
        }
        return { variant, angle: alpha, values }
      }}
      renderTask={(data) => {
        return (
          <>
            <p className="serlo-main-task">
              Das leckere Pizzastück ABC hat{' '}
              {elToGiven(
                data.variant.given[0],
                data.values[data.variant.given[0]]
              )}{' '}
              und{' '}
              {elToGiven(
                data.variant.given[1],
                data.values[data.variant.given[1]]
              )}
              .
            </p>
            <SubComponent data={data} />
            <p className="serlo-main-task">
              Berechnen Sie{' '}
              <strong>
                {data.variant.goal === 'A' ? (
                  <>den Flächeninhalt A</>
                ) : data.variant.goal === 'U' ? (
                  'den Umfang U'
                ) : data.variant.goal === 'alpha' ? (
                  'den Mittelpunktswinkel α'
                ) : data.variant.goal === 'b' ? (
                  <>die Bogenlänge {buildLatex('\\overgroup{AC}')}</>
                ) : (
                  'den Radius r'
                )}
              </strong>{' '}
              des Pizzastücks. Runden Sie auf eine Stelle nach dem Komma.
            </p>
          </>
        )
      }}
      renderSolution={(data) => {
        if (data.variant.method === 'area1') {
          return (
            <>
              <p>Nutze die Formel für den Flächeninhalt eines Kreissektors:</p>
              <p className="serlo-highlight-gray">
                A<sub>Pizza</sub> ={' '}
                {buildFrac(<>{data.values.alpha}°</>, '360°')} · (
                {data.values.r.toLocaleString('de-De')} cm)² · π
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                A<sub>Pizza</sub> ={' '}
                {roundToDigits(
                  (data.values.alpha / 360) *
                    Math.PI *
                    data.values.r *
                    data.values.r,
                  1
                ).toLocaleString('de-De')}{' '}
                cm²
              </p>
            </>
          )
        }
        if (data.variant.method === 'area2') {
          return (
            <>
              <p>Nutze die Formel für den Flächeninhalt eines Kreissektors:</p>
              <p className="serlo-highlight-gray">
                {data.values.A} cm² ={' '}
                {buildFrac(<>{data.values.alpha}°</>, '360°')} · r² · π
              </p>
              <p>Stelle die Formal nach r um:</p>
              <p className="serlo-highlight-gray">
                r ={' '}
                {buildBigSqrt(
                  <>
                    {buildFrac(<>{data.values.A} cm²</>, 'π')} ·{' '}
                    {buildFrac('360°', <>{data.values.alpha}°</>)}
                  </>
                )}
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                r ={' '}
                {roundToDigits(
                  Math.sqrt(
                    ((data.values.A / Math.PI) * 360) / data.values.alpha
                  ),
                  1
                ).toLocaleString('de-De')}{' '}
                cm
              </p>
            </>
          )
        }
        if (data.variant.method === 'area3') {
          return (
            <>
              <p>Nutze die Formel für den Flächeninhalt eines Kreissektors:</p>
              <p className="serlo-highlight-gray">
                {data.values.A} cm² = {buildFrac('α', '360°')} · (
                {data.values.r.toLocaleString('de-De')} cm)² · π
              </p>
              <p>Stelle die Formal nach α um:</p>
              <p className="serlo-highlight-gray">
                α ={' '}
                {buildFrac(
                  <>{data.values.A} cm²</>,
                  <>({data.values.r.toLocaleString('de-De')} cm)² · π</>
                )}{' '}
                · 360°
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                α ={' '}
                {roundToDigits(
                  (data.values.A / Math.pow(data.values.r, 2) / Math.PI) * 360,
                  1
                ).toLocaleString('de-De')}
                °
              </p>
            </>
          )
        }
        if (data.variant.method === 'arc1') {
          return (
            <>
              <p>Nutze die Formel für die Länge des Kreisbogen:</p>
              <p className="serlo-highlight-gray">
                {buildLatex('\\overgroup{AC}')} = {buildFrac('α', '360°')} · 2 ·
                r · π
              </p>
              <p>Setze gegebene Größen ein:</p>
              <p className="serlo-highlight-gray">
                {buildLatex('\\overgroup{AC}')} ={' '}
                {buildFrac(
                  <>{data.values.alpha.toLocaleString('de-De')}°</>,
                  '360°'
                )}{' '}
                · 2 · {data.values.r.toLocaleString('de-De')} cm · π
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                {buildLatex('\\overgroup{AC}')} ={' '}
                {roundToDigits(
                  (data.values.alpha / 360) * 2 * data.values.r * Math.PI,
                  1
                ).toLocaleString('de-De')}{' '}
                cm
              </p>
            </>
          )
        }

        if (data.variant.method === 'arc2') {
          return (
            <>
              <p>Nutze die Formel für die Länge des Kreisbogen:</p>
              <p className="serlo-highlight-gray">
                {data.values.b.toLocaleString('de-De')} cm ={' '}
                {buildFrac(<>{data.values.alpha}°</>, '360°')} · 2 · r · π
              </p>
              <p>Stelle die Gleichung nach r um:</p>
              <p className="serlo-highlight-gray">
                r ={' '}
                {buildFrac(
                  <>{data.values.b.toLocaleString('de-De')} cm</>,
                  <>2 · π</>
                )}{' '}
                ·{' '}
                {buildFrac(
                  '360°',
                  <>{data.values.alpha.toLocaleString('de-De')}°</>
                )}
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                r ={' '}
                {roundToDigits(
                  (data.values.b * 360) / 2 / Math.PI / data.values.alpha,
                  1
                ).toLocaleString('de-De')}{' '}
                cm
              </p>
            </>
          )
        }

        if (data.variant.method === 'arc3') {
          return (
            <>
              <p>Nutze die Formel für die Länge des Kreisbogen:</p>
              <p className="serlo-highlight-gray">
                {data.values.b.toLocaleString('de-De')} cm ={' '}
                {buildFrac('α', '360°')} · 2 ·{' '}
                {data.values.r.toLocaleString('de-De')} cm · π
              </p>
              <p>Stelle die Gleichung nach α um:</p>
              <p className="serlo-highlight-gray">
                α ={' '}
                {buildFrac(
                  <>{data.values.b.toLocaleString('de-De')} cm</>,
                  <>2 · {data.values.r.toLocaleString('de-De')} cm · π</>
                )}{' '}
                · 360°
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                α ={' '}
                {roundToDigits(
                  (data.values.b / 2 / Math.PI / data.values.r) * 360,
                  1
                ).toLocaleString('de-De')}
                °
              </p>
            </>
          )
        }

        if (data.variant.method === 'cir') {
          const b = roundToDigits(
            (data.values.alpha / 360) * 2 * Math.PI * data.values.r,
            2
          )
          return (
            <>
              <p>Berechne zuerst die Bogenlänge b:</p>
              <p className="serlo-highlight-gray">
                b = {buildFrac(<>{data.values.alpha}°</>, '360°')} · 2 ·{' '}
                {data.values.r.toLocaleString('de-De')} cm · π<br />
                <br />b = {b.toLocaleString('de-De')} cm
              </p>
              <p>
                Der Umfang des Pizzastück besteht aus dem Kreisbogen und zweimal
                dem Radius:
              </p>
              <p className="serlo-highlight-gray">
                U = {b.toLocaleString('de-De')} cm + 2 ·{' '}
                {data.values.r.toLocaleString('de-De')} cm
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                U ={' '}
                {roundToDigits(b + data.values.r * 2, 1).toLocaleString(
                  'de-De'
                )}{' '}
                cm
              </p>
            </>
          )
        }
        return <></>
      }}
    />
  )
}

function SubComponent({ data }: { data: DATA }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-5, 5, 5, -5],
      showNavigation: false,
      showCopyright: false,
    })

    const A = b.create('point', [0, 4], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })

    const B = b.create('point', [0, 0], {
      name: 'B',
      fixed: true,
    })
    const C = b.create('point', rotatePoint(0, 4, -data.angle), {
      name: 'C',
      fixed: true,
      label: { autoPosition: true },
    })
    b.create('sector', [B, A, C])

    b.create('segment', [A, B], { withLabel: true, name: 'r' })
    b.create('angle', [A, B, C], {
      withLabel: true,
      name: 'α',
      radius: 0.8,
      label: { color: 'darkgray' },
    })

    setBoard(b)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <JSXGraphWrapper id="jxgbox" width={300} height={300} />
}
