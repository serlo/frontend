import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  buildBigSqrt,
  buildFrac,
  buildJSX,
  buildLatex,
} from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
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
    return <>den Radius {pp(val)}&nbsp;cm</>
  }
  if (e === 'alpha') {
    return <>einen Mittelpunktswinkel ⍺&nbsp;=&nbsp;{pp(val)}°</>
  }
  if (e === 'U') {
    return <>einen Umfang von {pp(val)}&nbsp;cm</>
  }
  if (e === 'A') {
    return (
      <>
        den Flächeninhalt {pp(val)}
        &nbsp;cm²
      </>
    )
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
            {renderDiagram(data)}
            <p className="serlo-main-task">
              Berechnen Sie{' '}
              <strong>
                {data.variant.goal === 'A' ? (
                  <>den Flächeninhalt A</>
                ) : data.variant.goal === 'U' ? (
                  'den Umfang U'
                ) : data.variant.goal === 'alpha' ? (
                  'den Mittelpunktswinkel ⍺'
                ) : data.variant.goal === 'b' ? (
                  <>die Bogenlänge {buildLatex('\\overgroup{AC}')}</>
                ) : (
                  'den Radius r'
                )}
              </strong>{' '}
              des Pizzastücks.
            </p>
            <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
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
                {pp(data.values.r)} cm)² · π
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                A<sub>Pizza</sub> ={' '}
                {pp(
                  roundToDigits(
                    (data.values.alpha / 360) *
                      Math.PI *
                      data.values.r *
                      data.values.r,
                    2
                  )
                )}{' '}
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
                {pp(
                  roundToDigits(
                    Math.sqrt(
                      ((data.values.A / Math.PI) * 360) / data.values.alpha
                    ),
                    2
                  )
                )}{' '}
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
                {data.values.A} cm² = {buildFrac('⍺', '360°')} · (
                {pp(data.values.r)} cm)² · π
              </p>
              <p>Stelle die Formal nach ⍺ um:</p>
              <p className="serlo-highlight-gray">
                ⍺ ={' '}
                {buildFrac(
                  <>{data.values.A} cm²</>,
                  <>({pp(data.values.r)} cm)² · π</>
                )}{' '}
                · 360°
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                ⍺ ={' '}
                {pp(
                  roundToDigits(
                    (data.values.A / Math.pow(data.values.r, 2) / Math.PI) *
                      360,
                    2
                  )
                )}
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
                {buildLatex('\\overgroup{AC}')} = {buildFrac('⍺', '360°')} · 2 ·
                r · π
              </p>
              <p>Setze gegebene Größen ein:</p>
              <p className="serlo-highlight-gray">
                {buildLatex('\\overgroup{AC}')} ={' '}
                {buildFrac(<>{pp(data.values.alpha)}°</>, '360°')} · 2 ·{' '}
                {pp(data.values.r)} cm · π
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                {buildLatex('\\overgroup{AC}')} ={' '}
                {pp(
                  roundToDigits(
                    (data.values.alpha / 360) * 2 * data.values.r * Math.PI,
                    2
                  )
                )}{' '}
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
                {pp(data.values.b)} cm ={' '}
                {buildFrac(<>{data.values.alpha}°</>, '360°')} · 2 · r · π
              </p>
              <p>Stelle die Gleichung nach r um:</p>
              <p className="serlo-highlight-gray">
                r = {buildFrac(<>{pp(data.values.b)} cm</>, <>2 · π</>)} ·{' '}
                {buildFrac('360°', <>{pp(data.values.alpha)}°</>)}
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                r ={' '}
                {pp(
                  roundToDigits(
                    (data.values.b * 360) / 2 / Math.PI / data.values.alpha,
                    2
                  )
                )}{' '}
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
                {pp(data.values.b)} cm = {buildFrac('⍺', '360°')} · 2 ·{' '}
                {pp(data.values.r)} cm · π
              </p>
              <p>Stelle die Gleichung nach ⍺ um:</p>
              <p className="serlo-highlight-gray">
                ⍺ ={' '}
                {buildFrac(
                  <>{pp(data.values.b)} cm</>,
                  <>2 · {pp(data.values.r)} cm · π</>
                )}{' '}
                · 360°
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                ⍺ ={' '}
                {pp(
                  roundToDigits(
                    (data.values.b / 2 / Math.PI / data.values.r) * 360,
                    2
                  )
                )}
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
                {pp(data.values.r)} cm · π<br />
                <br />b = {pp(b)} cm
              </p>
              <p>
                Der Umfang des Pizzastück besteht aus dem Kreisbogen und zweimal
                dem Radius:
              </p>
              <p className="serlo-highlight-gray">
                U = {pp(b)} cm + 2 · {pp(data.values.r)} cm
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                U = {pp(roundToDigits(b + data.values.r * 2, 2))} cm
              </p>
            </>
          )
        }
        return <></>
      }}
    />
  )

  function renderDiagram(data: DATA) {
    return buildJSX(() => {
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
      b.create('sector', [B, A, C], { id: 'slice' })

      b.create('segment', [A, B], { withLabel: true, name: 'r' })
      b.create('angle', [A, B, C], {
        id: 'angle',
        withLabel: true,
        name: '⍺',
        radius: 0.8,
      })

      // inject pizza pattern
      const svg = b.containerObj.querySelector('svg')
      const defs = svg?.querySelector('defs')
      if (defs) {
        defs.innerHTML = `
      ${defs?.innerHTML}
      <pattern id="pizza" width="268" height="268" patternUnits="userSpaceOnUse" >
        <image x="20" y="20" href="/_assets/img/math-skills/exercises/pizza.svg" width="268" height="268" />
      </pattern>
      `
      }

      const path = svg?.querySelector('#jxgbox_slice') as SVGElement
      if (path) {
        path.style.fillOpacity = '1'
        path.style.fill = 'url(#pizza)'
      }

      const angleLabel = document.getElementById(
        'jxgbox_angleLabel'
      ) as HTMLDivElement
      if (angleLabel) {
        angleLabel.style.textAlign = 'center'
        angleLabel.style.width = '28px'
        angleLabel.style.borderRadius = '100%'
        angleLabel.style.background = 'white'
        angleLabel.style.opacity = '0.8'
        angleLabel.style.marginRight = '-8px'
      }

      return b
    }, data)
  }
}
