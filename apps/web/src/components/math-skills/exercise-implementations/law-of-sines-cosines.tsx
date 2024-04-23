import { useState, useEffect } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { autoResizeBoundingBox } from '../utils/auto-resize-bounding-box'
import { JSXGraphWrapper } from '../utils/jsx-graph-wrapper'
import { buildFrac, buildSqrt } from '../utils/math-builder'
import { rotatePoint } from '../utils/rotate-point'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

type Element = 'a' | 'b' | 'c' | 'alpha' | 'beta' | 'gamma'

interface Variant {
  given: [Element, Element, Element]
  goal: Element
  method: 'SSS' | 'SWS' | 'WSW' | 'SSWg'
}

const variants: Variant[] = [
  { given: ['b', 'c', 'a'], goal: 'alpha', method: 'SSS' },
  { given: ['c', 'a', 'b'], goal: 'beta', method: 'SSS' },
  { given: ['a', 'b', 'c'], goal: 'gamma', method: 'SSS' },

  { given: ['b', 'alpha', 'c'], goal: 'a', method: 'SWS' },
  { given: ['c', 'beta', 'a'], goal: 'b', method: 'SWS' },
  { given: ['a', 'gamma', 'b'], goal: 'c', method: 'SWS' },

  { given: ['alpha', 'c', 'beta'], goal: 'b', method: 'WSW' },
  { given: ['alpha', 'c', 'beta'], goal: 'a', method: 'WSW' },
  { given: ['beta', 'a', 'gamma'], goal: 'c', method: 'WSW' },
  { given: ['beta', 'a', 'gamma'], goal: 'b', method: 'WSW' },
  { given: ['gamma', 'b', 'alpha'], goal: 'a', method: 'WSW' },
  { given: ['gamma', 'b', 'alpha'], goal: 'c', method: 'WSW' },

  { given: ['c', 'b', 'gamma'], goal: 'beta', method: 'SSWg' },
  { given: ['b', 'a', 'beta'], goal: 'alpha', method: 'SSWg' },
  { given: ['a', 'c', 'alpha'], goal: 'gamma', method: 'SSWg' },
  { given: ['c', 'a', 'gamma'], goal: 'alpha', method: 'SSWg' },
  { given: ['b', 'c', 'beta'], goal: 'gamma', method: 'SSWg' },
  { given: ['a', 'b', 'alpha'], goal: 'beta', method: 'SSWg' },
]

interface DATA {
  a: number
  b: number
  c: number
  alpha: number
  beta: number
  gamma: number
  variant: Variant
}

function elToString(el: Element) {
  if (el === 'alpha') return 'α'
  if (el === 'beta') return 'β'
  if (el === 'gamma') return 'γ'

  return el
}

function getElValue(data: DATA, el: Element) {
  if (el.length === 1) {
    return Math.round(data[el] * 10) / 10
  }
  return Math.round(data[el])
}

function printGiven(data: DATA, i: number) {
  const el = data.variant.given[i]
  return (
    <>
      {elToString(el)} = {getElValue(data, el).toLocaleString()}
      {el.length === 1 ? ' cm' : '°'}
    </>
  )
}

export function LawOfSinesCosines() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const c = randomIntBetween(14, 65) / 10
        const b = randomIntBetween(14, 65) / 10
        const alpha = randomIntBetween(25, 155)
        const a = Math.sqrt(
          b * b + c * c - 2 * b * c * Math.cos((alpha / 180) * Math.PI)
        )
        const gamma =
          (Math.acos((a * a + b * b - c * c) / (2 * a * b)) / Math.PI) * 180

        const beta =
          (Math.acos((a * a + c * c - b * b) / (2 * a * c)) / Math.PI) * 180

        const variant = randomItemFromArray(variants)

        const data = { a, b, c, alpha, beta, gamma, variant }

        if (variant.method === 'SSWg') {
          while (data[variant.given[0]] < data[variant.given[1]]) {
            // rotate everything
            const t_a = data.a
            data.a = data.b
            data.b = data.c
            data.c = t_a

            const t_alpha = data.alpha
            data.alpha = data.beta
            data.beta = data.gamma
            data.gamma = t_alpha
          }
        }

        return data
      }}
      renderTask={(data) => {
        return (
          <>
            <p className="serlo-main-task">
              Im Dreieck ABC sind folgende Größen gegeben:
            </p>
            <p className="serlo-main-task">
              {printGiven(data, 0)}, {printGiven(data, 1)} und{' '}
              {printGiven(data, 2)}
            </p>
            <SubComponent data={data} />
            <p className="serlo-main-task">
              Berechnen Sie die Größe{' '}
              <strong className="text-newgreen">
                {elToString(data.variant.goal)}
              </strong>
              . Runden Sie auf eine Stelle nach dem Komma.
            </p>
          </>
        )
      }}
      renderSolution={(data) => {
        const x = getElValue(data, data.variant.given[0])
        const y = getElValue(data, data.variant.given[1])
        const z = getElValue(data, data.variant.given[2])
        if (data.variant.method === 'SWS') {
          const result =
            Math.round(
              Math.sqrt(
                x * x + z * z - 2 * x * z * Math.cos((y / 180) * Math.PI)
              ) * 10
            ) / 10
          return (
            <>
              <p>Stelle eine Gleichung mit dem Kosinussatz auf:</p>
              <p className="serlo-highlight-gray">
                {data.variant.goal}² = {data.variant.given[0]}² +{' '}
                {data.variant.given[2]}² - 2 · {data.variant.given[0]} ·{' '}
                {data.variant.given[2]} · cos{' '}
                {elToString(data.variant.given[1])}
              </p>
              <p>Setze gegebene Größen ein:</p>
              <p className="serlo-highlight-gray">
                {data.variant.goal} ={' '}
                {buildSqrt(
                  <>
                    {x.toLocaleString('de-De')}² + {z.toLocaleString('de-De')}²
                    - 2 · {x.toLocaleString('de-De')} ·{' '}
                    {z.toLocaleString('de-De')} · cos{' '}
                    {y.toLocaleString('de-De')}°
                  </>
                )}
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                {data.variant.goal} = {result.toLocaleString('de-De')} cm
              </p>
            </>
          )
        }
        if (data.variant.method === 'SSS') {
          const result =
            Math.round(
              (Math.acos((x * x + y * y - z * z) / (2 * x * y)) / Math.PI) *
                180 *
                10
            ) / 10
          return (
            <>
              <p>Stelle eine Gleichung mit dem Kosinussatz auf:</p>
              <p className="serlo-highlight-gray">
                cos {elToString(data.variant.goal)} ={' '}
                {buildFrac(
                  <>
                    {data.variant.given[0]}² + {data.variant.given[1]}² -{' '}
                    {data.variant.given[2]}²
                  </>,
                  <>
                    2 · {data.variant.given[0]} · {data.variant.given[1]}
                  </>
                )}
              </p>
              <p>Setze gegebene Größen ein:</p>
              <p className="serlo-highlight-gray">
                cos {elToString(data.variant.goal)} ={' '}
                {buildFrac(
                  <>
                    {x.toLocaleString('de-De')}² + {y.toLocaleString('de-De')}²
                    - {z.toLocaleString('de-De')}²
                  </>,
                  <>
                    2 · {x.toLocaleString('de-De')} ·{' '}
                    {y.toLocaleString('de-De')}
                  </>
                )}
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                {elToString(data.variant.goal)} ={' '}
                {result.toLocaleString('de-De')}°
              </p>
            </>
          )
        }
        if (data.variant.method === 'SSWg') {
          const result =
            Math.round(
              (Math.asin((y * Math.sin((z / 180) * Math.PI)) / x) / Math.PI) *
                180 *
                10
            ) / 10
          return (
            <>
              <p>Stelle eine Gleichung mit dem Sinussatz auf:</p>
              <p className="serlo-highlight-gray">
                {buildFrac(
                  <>sin {elToString(data.variant.goal)}</>,
                  data.variant.given[1]
                )}{' '}
                ={' '}
                {buildFrac(
                  <>sin {elToString(data.variant.given[2])}</>,
                  data.variant.given[0]
                )}
              </p>
              <p>Stelle die Gleichung um und setze gegebene Größen ein:</p>
              <p className="serlo-highlight-gray">
                sin {elToString(data.variant.goal)} ={' '}
                {buildFrac(
                  <>sin {z.toLocaleString('de-De')}°</>,
                  x.toLocaleString('de-De')
                )}{' '}
                · {y.toLocaleString('de-De')}
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                {elToString(data.variant.goal)} ={' '}
                {result.toLocaleString('de-De')}°
              </p>
            </>
          )
        }
        // Ich muss zuerst den dritten Winkel berechnen, dann kann ich damit eine Gleichung aufstellen.
        const lastAngleElement =
          data.variant.given[1] === 'a'
            ? 'alpha'
            : data.variant.given[1] === 'b'
              ? 'beta'
              : 'gamma'

        const w = 180 - x - z

        const result =
          Math.round(
            (y / Math.sin((w / 180) * Math.PI)) *
              Math.sin((z / 180) * Math.PI) *
              10
          ) / 10
        return (
          <>
            <p>
              Berechne den dritten Winkel über die Innenwinkelsumme im Dreieck:
            </p>
            <p className="serlo-highlight-gray">
              {elToString(lastAngleElement)} = 180° -{' '}
              {x.toLocaleString('de-De')}° - {z.toLocaleString('de-De')}° ={' '}
              {w.toLocaleString('de-De')}°
            </p>
            <p>Stelle eine Gleichung mit dem Sinussatz auf:</p>
            <p className="serlo-highlight-gray">
              {buildFrac(
                data.variant.goal,
                <>sin {elToString(data.variant.given[2])}</>
              )}{' '}
              ={' '}
              {buildFrac(
                data.variant.given[1],
                <>sin {elToString(lastAngleElement)}</>
              )}
            </p>
            <p>Stelle die Gleichung um und setze gegebene Größen ein:</p>
            <p className="serlo-highlight-gray">
              {data.variant.goal} ={' '}
              {buildFrac(
                y.toLocaleString('de-De'),
                <>sin {w.toLocaleString('de-De')}°</>
              )}{' '}
              · sin {z.toLocaleString('de-De')}°
            </p>
            <p>Berechne das Ergebnis:</p>
            <p className="serlo-highlight-green">
              {elToString(data.variant.goal)} = {result.toLocaleString('de-De')}{' '}
              cm
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

  const preB_x = data.c
  const preB_y = 0

  const [preC_x, preC_y] = rotatePoint(data.b, 0, -data.alpha)

  const angle = randomIntBetween(0, 359)
  const [Bx, By] = rotatePoint(preB_x, preB_y, angle)
  const [Cx, Cy] = rotatePoint(preC_x, preC_y, angle)

  const boundingbox = autoResizeBoundingBox([
    { x: 0, y: 0 },
    { x: Bx, y: By },
    { x: Cx, y: Cy },
  ])

  const dim = boundingbox[2] - boundingbox[0]

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox,
      showNavigation: false,
      showCopyright: false,
    })

    const pointA = b.create('point', [0, 0], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })

    const pointB = b.create('point', [Bx, By], {
      name: 'B',
      fixed: true,
      label: { autoPosition: true },
    })

    const pointC = b.create('point', [Cx, Cy], {
      name: 'C',
      fixed: true,
      label: { autoPosition: true },
    })

    const newgreen = 'rgb(47 206 177)'

    b.create('segment', [pointA, pointB], {
      name: 'c',
      withLabel: data.variant.given.includes('c') || data.variant.goal === 'c',
      label: {
        autoPosition: true,
        color: data.variant.goal === 'c' ? newgreen : 'black',
      },
    })
    b.create('segment', [pointA, pointC], {
      name: 'b',
      withLabel: data.variant.given.includes('b') || data.variant.goal === 'b',
      label: {
        autoPosition: true,
        color: data.variant.goal === 'b' ? newgreen : 'black',
      },
    })
    b.create('segment', [pointC, pointB], {
      name: 'a',
      withLabel: data.variant.given.includes('a') || data.variant.goal === 'a',
      label: {
        autoPosition: true,
        color: data.variant.goal === 'a' ? newgreen : 'black',
      },
    })

    if (data.variant.given.includes('alpha') || data.variant.goal === 'alpha') {
      b.create('angle', [pointB, pointA, pointC], {
        name: 'α',
        withLabel: true,
        orthoType: 'sector',
        radius: 0.05 * dim,
        label: {
          autoPosition: true,
          color: data.variant.goal === 'alpha' ? newgreen : 'black',
        },
      })
    }

    if (data.variant.given.includes('beta') || data.variant.goal === 'beta') {
      b.create('angle', [pointC, pointB, pointA], {
        name: 'β',
        withLabel: true,
        orthoType: 'sector',
        radius: 0.05 * dim,
        label: {
          autoPosition: true,
          color: data.variant.goal === 'beta' ? newgreen : 'black',
        },
      })
    }

    if (data.variant.given.includes('gamma') || data.variant.goal === 'gamma') {
      b.create('angle', [pointA, pointC, pointB], {
        name: 'γ',
        withLabel: true,
        orthoType: 'sector',
        radius: 0.05 * dim,
        label: {
          autoPosition: true,
          color: data.variant.goal === 'gamma' ? newgreen : 'black',
        },
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
